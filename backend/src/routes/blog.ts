import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { UpdateBlogInput, createBlogInput, updateBlogInput } from '@ayushc24/medium-common'

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET:string;  
    },
    Variables:{
        userId: string;
    }
}>();

blogRouter.use("/*",async(c,next)=>{
    const authHeader = c.req.header("authorization") || "";
    try{
        const user = await verify(authHeader,c.env.JWT_SECRET);

        if(user){
            c.set("userId",user.id as string);
        }else{
            c.status(403);
            return c.json({
                message:"You are not logged in"
            })
        }

        await next();
    }catch(e){
        c.status(403);
        return c.json({
            message:"Invalid JWT"
        });
    }

    
})

blogRouter.post('/',async(c)=>{

    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not correct",
        })
    } 
    const authorId=c.get("userId");
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

    const blog = await prisma.blog.create({
        data:{
            titles:body.title,
            content:body.content,
            authorId: Number(authorId)
        }
    })

    return c.json({
        id: blog.id,
    })
})


blogRouter.put('/',async(c)=>{

    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not correct",
        })
    } 
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

    const blog = await prisma.blog.update({
        where:{
            id:body.id,
        },
        data:{
            titles:body.title,
            content:body.content,
        }
    })

    return c.json({
        id:blog.id,
    })
})


//Todo: add pagination (10 blogs must appear)
blogRouter.get('/bulk',async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany({
        select:{
            content:true,
            titles:true,
            id:true,
            author:{
                select:{
                    name:true,
                }
            }

        }
    });

    return c.json({
        blogs
    });
})

blogRouter.get('/:id',async(c)=>{

    const id = c.req.param("id");
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id: Number(id),
            },
            select:{
                id:true,
                titles:true,
                content:true,
                author:{
                    select:{
                        name:true,
                    }
                }
            }
        })
    
        return c.json({
            blog
        })
    }catch(err){
        c.status(411);
        return c.json({
            message:"Error finding blog post"
        })
    }
   
})



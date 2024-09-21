import { AppBar } from "./AppBar"
import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}:{   blog: Blog})=>{
    return <div>
        <AppBar/>
        <div className="flex justify-center">
        <div className="grid grid-cols-2 px-10 w-full  pt-200 max-w-screen-xl pt-12">
            <div className="cols-span-8 ">
                
                <div className="text-5xl font-extrabold pt-2">
                    {blog.titles}
                </div>
                <div className="text-slate-500 pt-4">
                    Posted on 2nd December 2023
                </div>
                <div>
                    {blog.content}
                </div>
            </div>
            <div className="cols-span-4 ">
                <div className="text-slate-500 text-lg">
                    Author
                </div>
                <div className="flex">
                    <Avatar name={blog.author.name || "Anonymous"} size="small"/>
                    <div>
                        <div className="text-xl font-bold">
                            {blog.author.name || "Anonymous"}
                        </div>
                        <div className="pt-2 text-slate-500">
                            Random catch phase about authors ability to grab the users attention
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
        </div>
        
    </div> 
    
}
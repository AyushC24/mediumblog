import { AppBar } from "../Components/AppBar"
import { BlogCard } from "../Components/BlogCard"
import { useBlogs } from "../hooks"
import { Skeleton } from "../Components/Skeleton"

export const Blogs= ()=>{

        const {loading,blogs}=useBlogs();
        
        if(loading) {
            return <div>
                <AppBar/>
                <div className="flex justify-center">
                
                <div>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div>
                

                </div>
            </div>
            
        }

    return <div className="">
        <AppBar/>
        <div className="flex justify-center">
            <div className="">
                {blogs.map(blog=> <BlogCard id={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.titles}
                        content={blog.content}
                        publishedDate={"2nd Feb 2014"}>

                </BlogCard>)}
                
            </div>
        </div>

    </div>

}
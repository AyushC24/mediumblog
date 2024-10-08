import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { FullBlog } from "../Components/FullBlog";
import { AppBar } from "../Components/AppBar";
import { Spinner } from "../Components/Spinner";

export const Blog = ()=>{
    const {id}= useParams();
    const {loading,blog}= useBlog({
        id:Number(id || "1")
    });
    // console.log(blog);
    if(loading || !blog){
        return <div>
            <AppBar/>
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    
                        <Spinner/>

                </div>
            </div>
            
            
        </div>
    }
    return <div>
        <FullBlog blog={blog}/>
    </div>
}
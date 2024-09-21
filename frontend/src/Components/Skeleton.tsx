
export const Skeleton = ()=>{
    return <div>
        
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md ">
            <div className="flex">
                <div className="h-4 bg-gray-200 rounded-full  w-48 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-full  w-48 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-full  w-48 mb-4"></div>
                <div className="flex justify-center flex-col pl-2">
                    <div className="h-4 bg-gray-200 rounded-full  w-48 mb-4"></div>
                </div>
                <div className="flex justify-center flex-col pl-2 font-thin text-slate-500 text-sm">
                    <div className="h-4 bg-gray-200 rounded-full  w-48 mb-4"></div>

                </div>
            </div>
            <div className="h-4 bg-gray-200 rounded-full  w-48 mb-4"></div>
            <div className="text-md font-thin">
                <div className="h-4 bg-gray-200 rounded-full  w-48 mb-4"></div>
            </div>

            <div className="text-slate-500 text-sm font-thin  pt-4">
                <div className="h-4 bg-gray-200 rounded-full  w-48 mb-4"></div>
            </div>

        </div>
        
    </div>
}
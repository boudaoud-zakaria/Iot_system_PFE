
import FullPage from "./components/fullPage";
import NaveBare from "./components/naveBare";
export default function Page(
    { params }: { params: { teacher: string } }
){
    const paramData = params.teacher.toString();
    
    return (
        <main className="bg-white">
            <div className="h-screen w-screen flex flex-col items-center absolute top-0 left-0 bg-white pt-20">
                <NaveBare />
                <br />
                <FullPage param={paramData} />
            </div>
        </main>
    )
}
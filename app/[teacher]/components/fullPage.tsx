'use client'
import React, { startTransition, useEffect, useState, useTransition } from 'react'
import time from '../server/time';
import teacherName from '../server/teacherName';
import DataList from './dataList';
import { group } from 'console';

export default function FullPage({param} : any) {

    type time = {
        id: string | null;
        classroom: string | null;
        group: string | null;
        start: string;
        end: string;
        year: {
            id : string | null;
            name: string;
        } | null;
        module: {
            abbreviation: string;
        } | null;
    };

    type name={
        firstName : string | null;
        lastName : string | null;
    }

    const [days , setDays ] = useState(0);
    const [dataTimeResult , setDataTimeResult] = useState<time[]>([{
        id : "0",
        classroom : "",
        group : "",
        start : "",
        end : "",
        year : { 
            id : "",
            name : "",
        },
        module : {
            abbreviation : "",
        }
    }]);

    const [dataTimeTransition , startDataTimeTransition ] = useTransition();
    const [teacherNameTransation , startTeacherNameTransation] = useTransition();

    const [teacherFullName , setTeacherFullName] = useState<name[]>([])
    
    useEffect(()=>{
        startTeacherNameTransation(async()=>{
            const result = await teacherName(param);
            setTeacherFullName(result);
            console.log(teacherFullName);
            
        })
    },[param])
    
    const clickSunday = ()=>{
        setDays(1);
        startDataTimeTransition(async ()=>{
            setDataTimeResult(await time(param,"Sunday"));
            console.log(dataTimeResult);
        })
    }
    
    const clickMonday = ()=>{
        setDays(2);
        startDataTimeTransition(async ()=>{
            setDataTimeResult(await time(param,"Monday"));
            console.log(dataTimeResult);
        })
    }
    
    const clickTuesday = ()=>{
        setDays(3);
        startDataTimeTransition(async ()=>{
            setDataTimeResult(await time(param,"Tuesday"));
            console.log(dataTimeResult);
        })
    }
    
    const clickWednesday = ()=>{
        setDays(4);
        startDataTimeTransition(async ()=>{
            setDataTimeResult(await time(param,"Wednesday"));
            console.log(dataTimeResult);
        })
    }
    
    const clickThursday = ()=>{
        setDays(5);
        startDataTimeTransition(async ()=>{
            setDataTimeResult(await time(param,"Thursday"));
            console.log(dataTimeResult);
        })
    }
    
    const clickSaturday = ()=>{
        setDays(6);
        startDataTimeTransition(async ()=>{
            setDataTimeResult(await time(param,"Saturday"));
            console.log(dataTimeResult);
        })
    }

    const [year , setYear] = useState("");
    const [group , setGroup] = useState("");
    const [status , setStatus] = useState(0);

    const eventListStudentData = (yearParam : String , groupParam : String)=>{
        setYear(yearParam.toString());
        setGroup(groupParam.toString());
        setStatus(1);
    }

    return (
        <div className='w-full h-hull flex'>
            <div className='w-[50%] h-full flex flex-col items-center'>
                <h1 className='text-xl font-bold text-green-800 pl-10 relative right-5'>
                    {teacherFullName[0]?.firstName} {teacherFullName[0]?.lastName}
                </h1>
                <br />
                <br />
                <p className='text-gray-800'>Weekly time table </p>
                <br />
                <ul className="steps text-gray-700">
                    <li className={`step ${days == 1 ? `step-primary text-blue-600` : `text-gray-700`}`} onClick={clickSunday}>Sunday</li>
                    <li className={`step ${days == 2 ? `step-primary text-blue-600` : `text-gray-700`}`} onClick={clickMonday}>Monday</li>
                    <li className={`step ${days == 3 ? `step-primary text-blue-600` : `text-gray-700`}`} onClick={clickTuesday}>Tuesday</li>
                    <li className={`step ${days == 4 ? `step-primary text-blue-600` : `text-gray-700`}`} onClick={clickWednesday}>Wednesday</li>
                    <li className={`step ${days == 5 ? `step-primary text-blue-600` : `text-gray-700`}`} onClick={clickThursday}>Thursday</li>
                    <li className={`step ${days == 6 ? `step-primary text-blue-600` : `text-gray-700`}`} onClick={clickSaturday}>Saturday</li>
                </ul>
                <br />
                <br />
                <br />  
                <div className=' w-[80%] flex flex-col justify-between'>
                    {
                        dataTimeResult.length == 0 ? (
                            <div>
                                <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                                        <div className="flex-1 space-y-6 py-1">
                                        <div className="h-2 bg-slate-700 rounded"></div>
                                        <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-slate-700 rounded"></div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <h1 className='text-gray-400 text-center text-xl'>No Data Result</h1>
                            </div>
                        ):dataTimeResult[0].id === "0" ? 
                        (
                            <div>
                                <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                                        <div className="flex-1 space-y-6 py-1">
                                        <div className="h-2 bg-slate-700 rounded"></div>
                                        <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-slate-700 rounded"></div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <h1 className='text-gray-400 text-center text-xl'>Choos a day</h1>
                            </div>
                        ):  
                        dataTimeResult.map((dataResult)=>{
                            return(
                                <button key={dataResult.id}
                                onClick={() => eventListStudentData(dataResult.year?.id??"No result year" , dataResult.group??"no result group")}  className='flex flex-row justify-around items-center border-2 h-10 mb-3 text-gray-800 z-20'>
                                    <p className='w-1/4 text-center'>time {dataResult.start} / {dataResult.end}</p>
                                    <p className='w-1/4 text-center'>class {dataResult.classroom}</p>
                                    <p className='w-1/4 text-center'>{dataResult.year?.name} {dataResult.group}</p>
                                    <p className='w-1/4 text-center'>{dataResult.module?.abbreviation}</p>
                                </button>
                            )
                        })
                    }
                </div>
                {/* <div className='bg-blue-200 mt-5 h-8 flex items-center justify-center rounded-lg shadow-sm absolute bottom-8 w-[30%] text-gray-800'>data</div> */}
            </div>
            <DataList year={year?? "null"} group={group} status={status} schedule={dataTimeResult[0].id} yearName = {dataTimeResult[0].year?.name?? "No Year"} module={dataTimeResult[0].module?.abbreviation?? "No Module"} />
        </div>
    )
}

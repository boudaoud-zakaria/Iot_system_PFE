import React, { useEffect, useRef, useState, useTransition } from 'react'
import { GrValidate } from 'react-icons/gr'
import listStudent from '../server/listStudent';
import insert from '../server/insert';
import { PrismaClient } from "@prisma/client"

type paramType = {
    year : string | null;
    group : string | null;
    status : number;
    schedule : string | null;
    yearName : string | null;
    module : string | null;
}

type dataListType = {
    id : string;
    firstName: string;
    lastName: string;
    cardId : string | null; 
    absence: {
        id: string;
    }[];
}

export default function DataList({year, group , status , schedule , yearName , module} : paramType) {

    //! --------------{ use Transation }-----------------
    const [transation , startTransation] = useTransition();
    const [registerTransation , startRigisterTransation] = useTransition();
    const [scheduleTransation , startScheduleTransation] = useTransition()
    const [fetchTransation , startFetchTransation] = useTransition()
    //! --------------{ use state }-----------------
    const [dataList , setDataList] = useState<dataListType[]>([]);
    const [dataValue, setDataValue] = useState('');
    const [btn , setBtn] = useState(0);
    const [valiadtionStatus , setValidationStatus] = useState(0)
    const [start , setStart ] = useState('');
    const [breaking , setBreaking] = useState("break");
    //! --------------{ use ref }-----------------
    const inputReader = useRef<HTMLInputElement | null>(null); // Provide proper typing
    //! --------------{ use effect }-----------------
    useEffect(() => {
        // Focus on input field when component mounts
        if (inputReader.current) {
            inputReader.current.focus();
        }
        // startScheduleTransation(async()=>{
        //     const prisma = new PrismaClient();
        //     const data = await prisma.schedule.findMany(
        //         {
        //             where :{
        //                 yearId : year,
        //                 group : group,
        //             },
        //             select :{
        //                 id : true,
        //                 firstName : true,
        //                 lastName : true,
        //                 cardId : true,
        //             },
        //             orderBy: {
        //                 firstName: "asc", // Order by firstName in ascending order
        //             },
        //         }
        //     );
        // })
    }, [ year , group , status]);
    
    useEffect(()=>{
        startTransation(async()=>{
            const students = await listStudent((year as string) , (group as string));
            setDataList(students);
            setBtn(1);
            setStart(" : Start Register");
        })
    } , [year , group ]);
    //! --------------{ input data }-----------------
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataValue(e.target.value);
        // Clear the selected ID when input value changes
    };
    //! --------------{ btn effect }-----------------
    const Finish = ()=>{
        if(btn === 1){
            setValidationStatus(1);
            setBtn(2);
            setStart(" : waiting validation");
        }
        if(btn === 2){
            //* transation for update in database 
            setStart("");
            // console.log(dataList);
            startRigisterTransation(async()=>{
                const result = await insert(dataList , schedule??'');
                //? **********
                //* logic 
                //? **********
                window.location.reload();
            })
        }
    }
    //! -----------------
    const cancel = ()=>{
        window.location.reload();
    }
    //! -----------------
    const btnBreak = ()=>{
        if(breaking === "break"){
            if (inputReader.current) {
                inputReader.current.value = '';
                inputReader.current.disabled = true;
                setBreaking("start");
            }
        }
        else{
            if (inputReader.current) {
                inputReader.current.value = '';
                inputReader.current.disabled = false;
                inputReader.current.focus();
                setBreaking("break");
            }
        }
    }
    //! --------------{ blur efect }-----------------
    const page = ()=>{
        if(btn === 1){
            if (inputReader.current) {
                inputReader.current.value = '';
                inputReader.current.focus();
            }
            // setStart(" : Start Register");
        }
    }
    //! --------------{ submit }-----------------
    const validation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Validation form', dataValue);
        // setSelectedId(dataValue); // Set the selected ID
        setDataList(prevData =>
            prevData.map(student => {
                if (student.cardId === dataValue) {
                    // Update the year property to a new value
                    return { ...student, cardId: 'true' };
                }
                return student;
            })
        );
        if (inputReader.current) {
            inputReader.current.value = '';
            inputReader.current.focus();
        }
    };

    return(
        status === 1 ? (
            <div className='w-[50%] h-full p-8 relative bottom-5'>
                <div className={`fixed top-0 left-0 w-screen h-screen flex ${btn === 1 ? `z-20` : `z-0`}`} onClick={page}>
                    <div className='w-1/2 h-full flex justify-center items-end'>
                        {
                            btn === 1 ? (
                                <div className='flex w-[50%] justify-between'>
                                    <button className={`btn btn-primary shadow-sm relative bottom-10 w-[30%] text-xl text-white ${btn === 1 ? `z-50` : `z-10`}`} onClick={cancel}>Cancel</button>
                                    <button className={`btn btn-primary shadow-sm relative bottom-10 w-[30%] text-xl text-white ${btn === 1 ? `z-50` : `z-10`}`} onClick={btnBreak}>{breaking}</button>
                                    <button className={`btn btn-primary shadow-sm relative bottom-10 w-[30%] text-xl text-white ${btn === 1 ? `z-50` : `z-10`}`} onClick={Finish}>Finish</button>
                                </div>
                            ):(
                                <div className='flex w-1/2 justify-between'>
                                    <button className={`btn btn-primary shadow-sm relative bottom-10 w-[47%] text-xl text-white ${btn === 1 ? `z-50` : `z-10`}`} onClick={cancel}>Cancel</button>
                                    <button className={`btn btn-primary shadow-sm relative bottom-10 w-[47%] text-xl text-white ${btn === 1 ? `z-50` : `z-10`}`} onClick={Finish}>Save</button>
                                </div>
                            )
                        }
                    </div>
                    <div className='w-1/2 h-full'></div>
                </div>
                <p className='w-full text-center text-lg text-green-800'>you have {dataList.length} students {start}</p>
                <form 
                onSubmit={validation} 
                className='fixed bottom-[-24px]'>
                    <input
                        type="text"
                        onChange={handleChange}
                        ref={inputReader}
                    />
                    <button type="submit">Submit</button>
                </form>
                <br />
                <div className="overflow-x-auto h-full z-10">
                        <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Status</th>
                            </tr>
                        </thead>
                            <tbody className='rounded-xl'>
                            {
                            dataList.map((student) => ( 
                                <tr key={student.id} onClick={()=>document.getElementById(`${student.id}`).showModal()}
                                className='text-md'
                                style={{
                                    backgroundColor: student.cardId === 'true' ? '#e6fdd9' :  valiadtionStatus === 1 && student.cardId !== 'true' ? '#ffcbd1' : 'transparent' ,
                                    //backgroundColor: student.id === 'true' ? '#e6fdd9' : student.year === '0' && statusAbsent == 1 ? '#ffcbd1' : 'transparent',
                                    color :student.id === 'true' ? '#3a8a0d' : 'black'
                                }}
                                >
                                    <th className='text-gray-800'>*</th>
                                    <td className='text-gray-800'>{student.firstName}</td>
                                    <td className='text-gray-800'>{student.lastName}</td>
                                    <td><GrValidate className='text-xl text-green-700 opacity-0'
                                    style={{
                                        opacity: student.cardId === 'true'? 1 : 0,
                                    }}
                                    /></td>
                                    <dialog id={student.id} className="modal">
                                        <div className="modal-box bg-white">
                                            <form method="dialog">
                                              {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <h3 className="font-bold text-lg">{student.firstName} {student.lastName}</h3>
                                            <br />
                                            <p className='py-4 text-green-900'>
                                                Number of absences for this student is {student.absence.length}
                                            </p>
                                        </div>
                                    </dialog>
                                </tr>
                                
                                ))}
                            </tbody>
                    </table>
                </div>
            </div>
        ) : (
            <div className='flex w-[48%] justify-center items-center p-12'>
                <img src={'listImg3.svg'} alt={'alt'} className='relative top-8 right-5'/>
            </div>
        )
    )
}

import React, { useEffect,useState } from "react";


export default function Register() {

  const [name,setName]=useState()
  const [rollnum,setRollnum]=useState()
  const [section,setSection]=useState()
  const [sub1,setSub1]=useState()
  const [sub2,setSub2]=useState()
  const [sub3,setSub3]=useState()
  const [sub4,setSub4]=useState()
  const [sub5,setSub5]=useState()
   

  const handleSubmit=(event)=>{
    event.preventDefault();

    const formData = new FormData()
    formData.append("name",name)
    formData.append("rollNum",rollnum)
    formData.append("section",section)
    formData.append("sub1",sub1)
    formData.append("sub2",sub2)
    formData.append("sub3",sub3)
    formData.append("sub4",sub4)
    formData.append("sub5",sub5)
    
    // formData.forEach((v,k)=>{
    //   console.log(v,k)
    // })
    console.log(localStorage.getItem('jwt'));
    let tok = localStorage.getItem("token")
    fetch("http://localhost:5000/addresults",{
      method:'POST',
      body: new URLSearchParams(formData).toString(),
      headers: {
        "Authorization": tok,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    },)
  }
  useEffect(() => {
    let timeoutId;

    function resetTimeout() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        localStorage.clear();
      }, 5 * 60 * 1000); // 5 minutes
    }

    document.addEventListener("mousemove", resetTimeout);
    document.addEventListener("keydown", resetTimeout);

    resetTimeout(); // start the timeout initially
    return () => {
      document.removeEventListener("mousemove", resetTimeout);
      document.removeEventListener("keydown", resetTimeout);
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <div>
      <label htmlFor="name">Stident Name : </label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>

      <label htmlFor="rollnum">RollNumber : </label>
      <input type="text" name="" id="rollnum" value={rollnum}  onChange={(e)=>setRollnum(e.target.value)}/>

      <label htmlFor="class">Class</label>
      <input type="text" name="" id="class" value={section} onChange={(e)=>setSection(e.target.value)}/>

      <label htmlFor="subMarks">Subject And Marks: </label>
      
      <input type="text" name="" id="subMarks" placeholder="Subject Name,Marks" value={sub1} onChange={(e)=>setSub1(e.target.value)}/>
      <input type="text" name="" id="subMarks" placeholder="Subject Name,Marks" value={sub2} onChange={(e)=>setSub2(e.target.value)}/>
      <input type="text" name="" id="subMarks" placeholder="Subject Name,Marks" value={sub3} onChange={(e)=>setSub3(e.target.value)}/>
      <input type="text" name="" id="subMarks" placeholder="Subject Name,Marks" value={sub4} onChange={(e)=>setSub4(e.target.value)}/>
      <input type="text" name="" id="subMarks" placeholder="Subject Name,Marks" value={sub5} onChange={(e)=>setSub5(e.target.value)}/>


      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

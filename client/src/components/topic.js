import { useNavigate,Link,useParams} from 'react-router-dom';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';
import "./topic.css"
const Topic = () => {
    const [user, setUser] = useState(null);
    const { topicId } = useParams();
    const [topic, setTopic] = useState('');
    const [tasks,setTasks]=useState(null);
    const [print,setPrint]=useState('');

//task
const [userId, setUserId] = useState(null);
const [courseId, setCourseId] = useState(null);
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [start, setStart] = useState(Date.now());
const [due, setDue] = useState('05-05-1999');
//course
const [courseName, setCourseName] = useState('');
const [courseDescription, setCourseDescription] = useState('');
const [currGrade,setCurrGrade]=useState(0);
const [targetGrade,setTargetGrade]=useState(0);
const [show,setShow]=useState(false);

    useEffect(() => {
        let abortController;
        let unmounted = false;
        const getTopic = async () => {
            try {
                const s="http://localhost:5001/api/courses/"+topicId;
                const res = await fetch(s, {
                    method: "GET",

                    headers: {

                    },
                })
                    .then(res => res.json());
                    // alert(`hello, ${res.status}`);
                    if(!unmounted)
                    {
                setTopic(res);
                setCourseId(res._id);
                    }
            } catch (err) {

            }
        };
        const getUser = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch("http://localhost:5001/api/auth/", {
                    method: "GET",

                    headers: {
                        "x-auth-token": token
                    },
                })
                    .then(res => res.json());
                    if(!unmounted)
                    {
                setUser(res);
                setUserId(res._id);
                    }
            } catch (err) {

            }
        };
        getUser();
        getTopic();
        return () => { unmounted = true };
    });

    const getTasks = async () => {
        const token = localStorage.getItem("token");
        try {
            const res =await fetch("http://localhost:5001/api/tasks/", {
                method: "GET",

                headers: {
                    "x-auth-token": token
                },
            })
                .then(res => res.json());
                setPrint("");
                let content="";
                let counter=1;
                for(let i=0;i<res.length;i++)
                {
                    if(res[i].courseId===topicId)
                    {
                        var d=res[i].due_date;
                        d = d.split('T')[0];
                    content+="Task "+counter+":"+res[i].name+"\nTask info: "+res[i].description+"\n"+"Due date:"+(d)+"\n\n\n";
                    counter++;
                    }
                }
                setPrint(content);
                
            // setTasks(res);
        } catch (err) {

        }
    };
    const createTask = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:5001/api/tasks/", {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": token
                },
                body: JSON.stringify({
                    'userId':userId,
                    'courseId':courseId,
                    'name': name,
                    'description': description,
                    'start_date':start,
                    'due_date':due,
                }),
            })
                .then(res => res);
                // setStart(Date.now());

                alert(`hello, ${res.status}`);
        } catch (err) {

        }
        // alert(`hello, ${tasks}`);
        getTasks();
    };
    const updateTopic = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:5001/api/courses/update/"+topicId, {
                method: "PUT",

                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": token
                },
                body: JSON.stringify({
                    'name': courseName,
                    'description':courseDescription,
                    'current_grade':currGrade,
                    'target_grade':targetGrade,
                }),
            })
                .then(res => res);
            // setDate(res.date);
        } catch (err) {

        }
    };
    if(show)
    {
    return (
            <div>
                <h1> StudyBuddy </h1>
                <Navbar />
                <h2>{topic.name}</h2>
                <h5>Course description: {topic.description}</h5>
                <h6>Current score: {topic.current_grade}</h6>
                <h6>Target score: {topic.target_grade}</h6>
                <button onClick={setShow.bind(this,false)}>Update Course Info</button>
                <form onSubmit={updateTopic}>
<ul class="form-style-1">
    <li><label>Course Name <span class="required">*</span></label><input type="text" name="field1" class="field-long" value={courseName} onChange={(e) => setCourseName(e.target.value)}/></li>
    <li>
        <label>Course description </label>
        <textarea name="field5" id="field5" class="field-long field-textarea" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)}></textarea>
    </li>
        <li>
        <label>Current score</label>
        <select name="field4" class="field-select" value={currGrade} onChange={(e) => setCurrGrade(parseInt(e.target.value))}>
        <option value="0">0</option><option value="10">10</option><option value="20">20</option><option value="30">30</option>
        <option value="40">40</option><option value="50">50</option><option value="60">60</option><option value="70">70</option>
        <option value="80">80</option><option value="90">90</option><option value="100">100</option>
        </select>
    </li>
    <li>
        <label>Target score</label>
        <select name="field4" class="field-select" value={targetGrade} onChange={(e) => setTargetGrade(e.target.value)}>
        <option value="0">0</option><option value="10">10</option><option value="20">20</option><option value="30">30</option>
        <option value="40">40</option><option value="50">50</option><option value="60">60</option><option value="70">70</option>
        <option value="80">80</option><option value="90">90</option><option value="100">100</option>
        </select>
    </li>
    <li>
        <input type="submit" value="Submit" />
    </li>
</ul>
</form>
<button onClick={getTasks.bind(this,true)}>Show Tasks</button>
                <h6>To do list</h6>
                <h6><pre>{print}</pre></h6>
                {/* <p>{tasks}</p> */}
                <form onSubmit={createTask}>
                                <div className="form-group">
                                    <input id="courseName" value={name} onChange={(e) => setName(e.target.value)} type="Name" placeholder="Task Name" />
                                </div>
                                <div className="form-group">
                                    <input id="courseDescription" value={description} onChange={(e) => setDescription(e.target.value)} type="Task description" placeholder="Description" />
                                </div>
                                <div className="form-group">
                                    <input id="courseDue" value={due} onChange={(e) => setDue(e.target.value)} type="Task due date" placeholder="Due date"/>
                                </div>
                                <button type="submit" className="btn btn-dark">Add new task</button>
                </form>
            </div>
        )
    }          
    else{
        return (
            <div>
                <h1> StudyBuddy </h1>
                <Navbar />
                <h2>{topic.name}</h2>
                <h5>Course description: {topic.description}</h5>
                <h6>Current score: {topic.current_grade}</h6>
                <h6>Target score: {topic.target_grade}</h6>
                <button onClick={setShow.bind(this,true)}>Update Course Info</button>
                {/* <p>{tasks}</p> */}
                <br></br><br></br>
                <button onClick={getTasks.bind(this,true)}>Show Tasks</button>
                <h6>To do list</h6>
                <h5><pre>{print}</pre></h5>
                <form onSubmit={createTask}>
                                <div className="form-group">
                                    <input id="courseName" value={name} onChange={(e) => setName(e.target.value)} type="Name" placeholder="Task Name" />
                                </div>
                                <div className="form-group">
                                    <input id="courseDescription" value={description} onChange={(e) => setDescription(e.target.value)} type="Task description" placeholder="Description" />
                                </div>
                                <div className="form-group">
                                    <input id="courseDue" value={due} onChange={(e) => setDue(e.target.value)} type="Task due date" placeholder="Due date"/>
                                </div>
                                <button type="submit" className="btn btn-dark">Add new task</button>
                </form>
            </div>
        )
    }                 
}


export default Topic;
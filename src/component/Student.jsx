import React from 'react';
import './Student.css';

class Students extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showGrades : false,
            
        }
    }

    toggle(e,i){
        e.preventDefault();
        this.props.handleToggle(i);
    };

    addTag(e,i){
        e.preventDefault();
        let tagName = e.target[0].value;
        e.target[0].value = '';
        this.props.handleAddTag(tagName,i);
    };

    render(){ 
        const {studentList} = this.props;
        return(
            <div className='studentListContainer'>
                {studentList && studentList.map((student,i)=> 
                    <div key={student.id} className='studentContainer'>
                        <div className='infoArea'>
                            <div className='studnetInfo'>   
                                <div className='userpic'><img src={student.pic} /></div>
                                <div className='userinfo'>
                                    <div>{student.firstName.toUpperCase()} {student.lastName.toUpperCase()}</div>
                                    <div>Email: {student.email}</div>
                                    <div>Company: {student.company}</div>
                                    <div>Skill: {student.skill}</div>
                                    <div>Average: {student.grades.reduce((a,c)=>(parseInt(a)+parseInt(c)))/student.grades.length}%</div>
                                </div>
                            </div>
                            <button className='btn-toggle  expand-btn' onClick={(e)=>{this.toggle(e,i)}}> 
                                { student.displayGrade ? <i className="fa fa-minus fa-3x"></i> : <i className="fa fa-plus fa-3x"></i> }
                            </button>
                        </div>   
                        { student.displayGrade &&
                            <div className='toggleArea'>
                                {student.grades.map((grade,i)=>
                                    <div key={i} className='grades'><span>Test{i+1}: </span>  {grade}%</div>
                                )}
                                
                                <form className='tagForm' onSubmit={(e)=>{this.addTag(e,i)}}>
                                    <div className='tagLine'>
                                        {student.tags.length>0 &&
                                            student.tags.map((t,i) =>
                                                <span key={i} className='tags'>{t}</span>
                                        )}

                                    </div>
                                    <input placeholder='Add a tag' className='add-tag-input'></input>
                                </form>
                            </div>
                            
                        }
                    </div>
                )}
            </div>
        )
    }
}

export default Students;
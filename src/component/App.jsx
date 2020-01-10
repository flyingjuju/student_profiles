import React from 'react';
import axios from 'axios';
import Students from './Student';
import './App.css';

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            students: null,
            filteredstudents: null,
            searchNameOn: false,
            searchTagOn: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleAddTag = this.handleAddTag.bind(this);
    }

    componentDidMount(){
        axios({
            method: "GET",
            url: "https://www.hatchways.io/api/assessment/students",
        })
        .then(({data})=>{
            let list = data.students;
            list.forEach((d)=>{
                d.displayGrade = false;
                d.tags = [];
            })
            this.setState({
                students : list,
                filteredstudents: list
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    };

    searchName(e){
        const searchTerm = e.target.value.toLowerCase();
        let searchNameOn = searchTerm ? searchTerm : false;
        let searchTagOn = this.state.searchTagOn;
        let originalList = this.state.students.slice();
        let newList;
        if(searchTagOn){
            let tempList = originalList.filter(student=>{return ((student.firstName + " " + student.lastName).toLocaleLowerCase().includes(searchTerm))});
            newList = tempList.filter(student => {return (student.tags.some((tag)=> tag.includes(searchTagOn)))})
        } else {
            newList = originalList.filter(student=>{
                return ((student.firstName + " " + student.lastName).toLocaleLowerCase().includes(searchTerm))
            })
        }
        this.setState({
            searchNameOn: searchNameOn,
            filteredstudents: newList
        })
    };

    searchTag(e){
        const searchTerm = e.target.value.toLowerCase();
        let searchTagOn = searchTerm ? searchTerm : false;
        let searchNameOn = this.state.searchNameOn;
        let originalList = this.state.students.slice();
        let newList;
        if(searchNameOn){
            let tempList = originalList.filter(student=>{return ((student.firstName.toLowerCase().includes(searchNameOn) || student.lastName.toLowerCase().includes(searchNameOn)))});
            newList = searchTerm ? tempList.filter(student=>{return (student.tags.some((tag)=>tag.includes(searchTerm)))}) :tempList
        } else {
            newList =  searchTerm ? originalList.filter(student=>{return (student.tags.some((tag)=> tag.includes(searchTerm)))}) :originalList
        }
        this.setState({
            searchTagOn: searchTagOn,
            filteredstudents: newList
        })
    };

    handleToggle(i){
        let list = this.state.filteredstudents || this.state.students;
        let display = !list[i].displayGrade;
        list[i].displayGrade = display
        this.setState({
            filteredstudents: list
        })
    };

    handleAddTag(tagName, i){
        let list = this.state.filteredstudents || this.state.students;
        if(!list[i].tags.includes(tagName)){
            list[i].tags.push(tagName)
        }
        this.setState({
            filteredstudents: list
        })
    };

    render(){
        return(
            <div className='container'>
                <div className='searchArea'>
                    <div className='searchBar'>
                        <input placeholder='Search by name' onChange={e=>{this.searchName(e)}} id='name-input'></input>
                    </div>
                    <div className='searchBar'>
                        <input placeholder='Search by tag' onChange={e=>{this.searchTag(e)}} id='tag-input'></input>
                    </div>

                </div>
                <Students studentList={this.state.filteredstudents || this.state.students} handleToggle={this.handleToggle} handleAddTag={this.handleAddTag}/>
            </div>
        )
    }

}

export default App;
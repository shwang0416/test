
import React, {useState, useEffect} from 'react';
// import r`
export default function IssueList (props) {
    const [issues,setIssues] = useState();
    const [discFlag,setDiscFlag] = useState();
    const ORG_NAME = 'angular';
    const REPO_NAME = 'angular-cli';

    // const [addFlag ,setAddFlag] = useState(false);
    var addFlag = false;

    const renderAdd = () => {
        return (
            <a href="https://thingsflow.com/ko/home">
                <img src="https://placehold.it/500x100?text=ad"/>
            </a>
        );
    }
    
    const renderDiscription = () => {
        console.log(discFlag);
        
            return (
                <>
                    <div id={discFlag.id} className='issue_container' onClick={()=>{
                    setDiscFlag(discFlag)
                }}>
                    <div className='number_title'>
                        <span className='number'>#{discFlag.number}</span>
                        <span className='title'>{discFlag.title}</span>
                    </div>
                    <div className='user_update'>
                        <span className='user'>작성자: {discFlag.user.login}</span>
                        <img className='avatar_url' src={discFlag.user.avatar_url}/>
                        <span className='update'>작성일: {discFlag.updated_at}</span>
                    </div>
                    <div>
                        <span className='comments'>코멘트: {discFlag.comments}</span>
                    </div>
                </div>
                    <hr/>
                <div>
                {discFlag.body}
                </div>
                </>
            );

        
    }

    const renderIssue = () => {
        const issueList = issues.map((issue, index) => {
            if (index === 5) {
                addFlag = true;
            }
            else if (index === 6) {
                addFlag = false;
            }
            return (
                <>
                {addFlag ? renderAdd() : 
                <div id={issue.id} className='issue_container' onClick={()=>{
                    setDiscFlag(issue)
                }}>
                    <div className='number_title'>
                        <span className='number'>#{issue.number}</span>
                        <span className='title'>{issue.title}</span>
                    </div>
                    <div className='user_update'>
                        <span className='user'>작성자: {issue.user.login}</span>
                        <span className='update'>작성일: {issue.updated_at}</span>
                    </div>
                    <div>
                        <span className='comments'>코멘트: {issue.comments}</span>
                    </div>
                </div>
                }
                <hr/>
            </>
            ) 
        });
        return issueList;
    };
    useEffect(() => {
        const loadData = (async () => {
            // const res = await fetch(`https://api.github.com/repos/angular/angular-cli/issues?sort=comments?page=${props.pageNumber}`);
            const res = await fetch(`https://api.github.com/repos/${ORG_NAME}/${REPO_NAME}/issues?sort=comments?page=${props.pageNumber}`);
            const json = await res.json();
            const result = await json.filter((element)=>{
                return element.state === 'open'
            })
            setIssues(result);
            console.log(props.pageNumber);
        });
        loadData();
    }, [props.pageNumber])

    return (
        <>
        <h1> {ORG_NAME}/{REPO_NAME} </h1>
        <div>
            {/* {issues ? renderIssue() : "Loading"} */}
            {issues ? discFlag ? renderDiscription() : renderIssue(): "Loading"}
        </div>
        </>
    );
}
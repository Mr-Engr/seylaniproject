import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter as Router , Switch ,Route} from 'react-router-dom'
import { GlobalContext } from '../context/context';
import Home from '../screens/home/home';
import Login from '../screens/login/login';
import Registration from '../screens/sign-up/sign-up';
import { auth , onAuthStateChanged , getDoc , doc, db ,onSnapshot  , collection  , getDocs} from './firebase';
import AdminRejectedApproved from '../screens/approved-rejected/approved-rejected';

const AppRoutes = () => {
    let {state , dispatch} = useContext(GlobalContext);
    let [userStatus , setUserStatus] = useState()
    useEffect(()=>{
        onAuthStateChanged(auth ,async (user)=>{
            if(user){
                console.log(user , "user Found");
                setUserStatus(user)
                try {
                    let userRef = doc(db, 'users' , user.uid)
                    let userDetails = await getDoc(userRef);
                    dispatch({type : "ACTIVE_USER" , payload : userDetails.data()})

                    let publicApplications = collection(db, "publcApplicaitons")
                    onSnapshot(publicApplications , (data)=>{
                        data.docChanges().forEach((changes)=>{
                            if(changes.type === 'added'){
                                dispatch({type : "ALL_PUBLIC_APPLICATIONS" , payload : changes.doc.data()})
                            }else if(changes.type === "modified"){
                                dispatch({type : "ALL_PUBLIC_APPLICATIONS" , payload : changes.doc.data()})
                            }
                        })
                    })
                } catch (error) {
                    console.log("error : " , error)
                }
            }else{
                console.log("user not found");
                setUserStatus(null)
                dispatch({type : "ACTIVE_USER" , payload : undefined})
            }
        })
    },[])
    return (
        <div>
            <Router>
                <Switch>
                    
                            <Route path="/home" >
                                <Home />
                            </Route>
                            <Route path="/approved-and-rejected" >
                                <AdminRejectedApproved />
                            </Route>
                        
                            <Route path="/" exact>
                                <Login />
                            </Route>
                            <Route path="/sign-up">
                                <Registration />
                            </Route>
                      
            
                </Switch>
            </Router>
        </div>
    )
}

export default AppRoutes;

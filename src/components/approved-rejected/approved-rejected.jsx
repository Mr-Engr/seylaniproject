import React, { useContext } from 'react';
import { GlobalContext } from '../../context/context';
import styles from './approved-approved.module.scss';

const ApprovedAndRejectedComponent = () => {
    let {state , dispatch} = useContext(GlobalContext)
    return (
        <div className={styles.home_Component}>
        <div className={styles.main_home1}>
            <p>Status for Approved/Rejection Tab</p>
        </div>

        <div className={styles.main_home2}>
            <table>
            <tr>
                    <th>Person Name</th>
                    <th>User ID</th>
                    <th>Approved/Rejection DateTime </th>
                    <th>ConfirmationStatus</th>
                </tr>
            {
                state.allPublicApplications.map((doc)=>{
                   if(doc.status === "rejected"){
                    return(
                        <>
                   
                <tr>
                   <td>{doc.name}</td>
                   <td>{doc.uid}</td>
                   <td>{doc.rejectedDate.seconds}</td>
                   <td>Reject</td>
                </tr>
               
                        </>
                    )
                   }else{
                       return(
                           <p>Approval or Not</p>
                       )
                   }
                })
            }
            </table>
        </div>
        
    </div>
    )
}

export default ApprovedAndRejectedComponent;

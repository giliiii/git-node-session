import React, { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const navigate = useNavigate()
    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        const userToken = localStorage.getItem("userToken")
        localStorage.removeItem("userToken")
        setTimeout(() => {
           navigate("/");
        }, 1500);


    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        setTimeout(() => {
           navigate("/");
        }, 1500);
    }


    const confirm = () => {
        confirmDialog({
            message: 'Are you shure that you want to exit?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };
    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="card flex flex-wrap gap-2 justify-content-center">
                <Button onClick={confirm} icon="pi pi-times" label="Delete"></Button>
            </div>
        </>)
}

export default Logout

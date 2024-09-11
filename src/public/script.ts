let addModal = document.getElementById('add-task-modal');
let addBtn = document.getElementById('add-btn');
if (addBtn) {
    addBtn.addEventListener('click', () => {
        if(addModal){
            if (addModal.style.display === 'none') {
                addModal.style.display = 'block';
            }
        }
    })
}
let addClose = document.getElementById('add-modal-close');
if (addClose) {
    addClose.addEventListener('click', () => {
        if(addModal){
            addModal.style.display = 'none';
        }
    })
}

let addForm = document.getElementById('add-task-form');
if (addForm) {
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const Aname = (document.getElementById('taskName') as HTMLInputElement)?.value || '';
        console.log(Aname);
        
        if (Aname !== '') {
            const response = await fetch('/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Aname })
            })
            const result = await response.json();
            if (result.success) {
                snackBar(result.message);
            } else {
                snackBar(result.message);
            }
        } else {
            snackBar('field empty')
        }
    })
}

const editBtn = document.querySelectorAll('.edit-btn');
if (editBtn) {
    editBtn.forEach((element, index) => {
        element.addEventListener('click', () => {
            const editModals = document.querySelectorAll('.edit-task-modal');
            const editModal = editModals[index] as HTMLElement;
            if (editModal.style.display === 'none') {
                editModal.style.display = 'block';
            }
            const editCloses = document.querySelectorAll('.edit-modal-close');
            const editClose = editCloses[index];

            editClose.addEventListener('click', () => {
                editModal.style.display = 'none';
            })

            const editForms = document.querySelectorAll('.edit-task-form');
            const editForm = editForms[index];
            console.log(editForm,'ft');
            
            editForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                let Ename = (document.getElementById(`eTaskName-${index + 1}`) as HTMLInputElement)?.value || '';
                let id = (document.getElementById(`id-${index + 1}`) as HTMLInputElement)?.value || '';
                if (Ename !== '') {
                    const response = await fetch('/update', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ Ename, id })
                    })
                    const result = await response.json();
                    if (result.success) {
                        snackBar(result.message)
                    } else {
                        snackBar(result.message)
                    }
                } else {
                    snackBar('field empty')
                }
            })
        })
    })
}

const completeBtn = document.querySelectorAll('.complete-btn');
completeBtn.forEach((element, index) => {
    element.addEventListener('click', async (e) => {
        const compBtn = e.target as HTMLElement;
        const id = compBtn.getAttribute('data-id');
        if (compBtn) {
            const response = await fetch('/mark/', {
                method: 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ id })
            })
            const result = await response.json();
            if (result.success) {
                snackBar(result.message)
            } else {
                snackBar(result.message)
            }
        }
    })
});

const deleteBtn = document.querySelectorAll('.delete-btn');
deleteBtn.forEach((element, index) => {
    element.addEventListener('click', async (e) => {
        const delBtn = e.target as HTMLElement;
        const id = delBtn.getAttribute('data-id');
        if (delBtn) {
            const response = await fetch(`/remove/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json();
            if (result.success) {
                snackBar(result.message)
            } else {
                snackBar(result.message)
            }
        }
    })
})

function snackBar(message : string) {
    const snackDiv = document.getElementById('snack-bar');
    if(snackDiv){
        snackDiv.innerText = message;
        snackDiv.style.display = 'block'
        setTimeout(() => {
        snackDiv.style.display = 'none';
        location.reload();
    }, 1500)
    }
}

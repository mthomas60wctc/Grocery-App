const editItemModal = document.getElementById('edit-item-modal');
//isnt working
if (editItemModal) {
    editItemModal.addEventListener('show.bs.modal', e => {
        const button = e.relatedTarget;
        const item = button.getAttribute('data-bs-caller');
        editItemModal.querySelector('.modal-title').textContent = "Edit " + item;
    })
}


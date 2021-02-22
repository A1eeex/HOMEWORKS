$(() => {
        const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts';
        const DELETE_BTN_CLASS = '.delete-btn';
        const EDIT_BTN_CLASS = '.edit-btn';
        const CONTACT_ITEM = '.item';


        const $listEl = $('#contactsList');
        const $idInputEl = $('#contactId');
        const $nameInputEl = $('#contactName');
        const $surnameInputEl = $('#contactSurname');
        const $phoneInputEl = $('#contactPhone');
        const $addBtnEl = $('#addBtn');
        const contactTemplate = $('#contactTemplate').html();
        
        let list = [];
        
        $listEl
        .on('click', DELETE_BTN_CLASS, onDeleteContactClick)
        .on('click', EDIT_BTN_CLASS, onUpdateContactClick)
        
        $addBtnEl.on('click', onaAdBtnElClickOpenModal);

        const $formDialog = $('#modalForm').dialog({
                autoOpen: false,
                modal: true,
                buttons: {
                        Save: () => {
                                saveContact(),
                                        closeModal()
                                },
                        Cancel: closeModal,
                },
                close: () => clearForm()
        })

        init();

        function init() {
                getList();
        }
        
        function onDeleteContactClick(event) {
                const $element = getContactElement($(this));
                deleteContact(getElementIndex($element));
        }

        function getContactElement($element) {
                return $element.closest(CONTACT_ITEM);
        }

        function deleteContact(contactId) {
                list = list.filter((contact) => contact.id != contactId);
                deleteContactElement(contactId);
                request(URL + `/${contactId}`, 'DELETE');
        }

        function deleteContactElement(contactId) {
                const $element = getContactElementId(contactId);
                $element && $element.remove();
        }

        function getContactElementId(id) {
                return $listEl.find(`[data-id="${id}"]`);
        }

        function getElementIndex($element) {
                const $contactItem = getContactElement($element);
                return $contactItem && $contactItem.data('id');
        }

        function onUpdateContactClick(event) {
                openModal();
                const $element = getContactElement($(this));
                editContact(getElementIndex($element))
        }

        function editContact(contactId) {
                const contact = list.find((contact) => contact.id == contactId);
                console.log('contact: ', contact);
                fillForm(contact);
        }


        function onaAdBtnElClickOpenModal(e) {
                openModal()
        }
        function openModal() {
                $formDialog.dialog('open')
        }
        function closeModal() {
                $formDialog.dialog('close')
        }

        function saveContact() {
                const $item = getFormData();

                if ($item.id) {
                        updateContact($item);
                } else {
                        addContact($item);
                }
        }

        function getFormData() {
                return {
                        id: $idInputEl.val(),
                        name: $nameInputEl.val(),
                        surname: $surnameInputEl.val(),
                        phone: $phoneInputEl.val(),
                };
        }

        function updateContact($item) {
                request(`${URL}/${$item.id}`, 'PUT', $item);

                list = list.map((el) => (el.id != $item.id ? el : $item));

                renderList(list);
                renderContact(list)
        }

        function addContact($item) {
                delete $item.id
                request(URL, 'POST', $item)
                        .then(($item) => {
                                list.push($item);
                                renderContact($item);
                        });
        }


        function getList() {
                request(URL).
                        then(setData).
                        then(renderList);
        }

        function setData(data) {
                return (list = data);
        }

        function renderList(list) {
                list.forEach(renderContact);
        }

        function renderContact(note) {
                const $contactElement = $(getItemElementHtml(note));
                $listEl.append($contactElement);
        }

        function getItemElementHtml(item) {
                return contactTemplate
                        .replace('{{id}}', item.id)
                        .replace('{{name}}', item.name)
                        .replace('{{surname}}', item.surname)
                        .replace('{{phone}}', item.phone);
        }

        function request(url, method = 'GET', data) {
                console.log('data: ', data);
                return fetch(url, {
                        method,
                        body: data && JSON.stringify(data),
                        headers: { 'Content-type': 'application/json' },
                })
                        .then((res) => (res.ok ? res.json() : Promise.reject()))
                        .catch(() => getList());
        }

        function clearForm() {
                $idInputEl.val('');
                $nameInputEl.val('');
                $surnameInputEl.val('');
                $phoneInputEl.val('');
        }

        function fillForm(obj) {
                console.log($nameInputEl);
                $idInputEl.val(obj.id);
                $nameInputEl.val(obj.name);
                $surnameInputEl.val(obj.surname)
                $phoneInputEl.val(obj.phone);
        }


});

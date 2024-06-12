function initializeReportForm() {
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData();
            formData.append('description', document.getElementById('description').value);
            formData.append('screenshot', document.getElementById('screenshot').files[0]);
            const backendUrl = 'https://secretly-humble-yak.ngrok-free.app/report';
            fetch(backendUrl, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    alert(data);
                    document.getElementById('reportForm').reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error while sending message.');
                });
        });

        const dropArea = document.getElementById('dropArea');
        const fileInput = document.getElementById('screenshot');

        dropArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            dropArea.classList.add('dragging');
        });

        dropArea.addEventListener('dragleave', () => {
            dropArea.classList.remove('dragging');
        });

        dropArea.addEventListener('drop', (event) => {
            event.preventDefault();
            dropArea.classList.remove('dragging');
            handleFiles(event.dataTransfer.files);
        });

        dropArea.addEventListener('click', () => {
            fileInput.click();
        });

        dropArea.addEventListener('paste', (event) => {
            const items = (event.clipboardData || event.originalEvent.clipboardData).items;
            for (const item of items) {
                if (item.kind === 'file') {
                    const blob = item.getAsFile();
                    handleFiles([blob]);
                }
            }
        });

        fileInput.addEventListener('change', () => {
            handleFiles(fileInput.files);
        });

        function handleFiles(files) {
            if (files.length > 0) {
                const file = files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.style.maxWidth = '100%';
                    dropArea.innerHTML = '';
                    dropArea.appendChild(img);
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    fileInput.files = dataTransfer.files;
                };
                reader.readAsDataURL(file);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', initializeReportForm);
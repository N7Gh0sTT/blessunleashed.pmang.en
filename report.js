function initializeReportForm() {
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData();
            formData.append('description', document.getElementById('description').value);
            formData.append('screenshot', document.getElementById('screenshot').files[0]);
            const backendUrl = 'https://212.227.26.203:3000/report';
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
    }
}
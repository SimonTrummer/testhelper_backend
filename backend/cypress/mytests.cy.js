describe('Exam CRUD operations', () => {
    const baseUrl = 'http://localhost:3000';

    beforeEach(() => {
        cy.request('POST', `${baseUrl}/reset`);
    });

    it('should create a new exam', () => {
        cy.request('POST', `${baseUrl}/exams`, {
            name: 'Test Exam',
            date: '2024-06-01'
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('name', 'Test Exam');
        });
    });

    it('should get all exams', () => {
        cy.request('GET', `${baseUrl}/exams`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    it('should get a specific exam by ID', () => {
        cy.request('POST', `${baseUrl}/exams`, {
            name: 'Test Exam',
            date: '2024-06-01'
        }).then((response) => {
            const examId = response.body.id;
            cy.request('GET', `${baseUrl}/exams/${examId}`).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('id', examId);
            });
        });
    });

    it('should update an exam by ID', () => {
        cy.request('POST', `${baseUrl}/exams`, {
            name: 'Test Exam',
            date: '2024-06-01'
        }).then((response) => {
            const examId = response.body.id;
            cy.request('PUT', `${baseUrl}/exams/${examId}`, {
                name: 'Updated Exam',
                date: '2024-06-02'
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('name', 'Updated Exam');
            });
        });
    });

    it('should delete an exam by ID', () => {
        cy.request('POST', `${baseUrl}/exams`, {
            name: 'Test Exam',
            date: '2024-06-01'
        }).then((response) => {
            const examId = response.body.id;
            cy.request('DELETE', `${baseUrl}/exams/${examId}`).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('message', 'Exam deleted successfully');
            });
        });
    });
});

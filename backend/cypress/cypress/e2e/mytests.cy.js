describe('Exam CRUD operations', () => {
    const baseUrl = 'http://localhost:3000/exams';

    // beforeEach(() => {
    //     cy.request('POST', `${baseUrl}/reset`); // Uncomment and implement if needed
    // });

    it('should create a new exam', () => {
        cy.request('POST', `${baseUrl}/post`, {
            id: Date.now(),
            date: new Date(),
            difficulty_rating: 3,
            type: 'Midterm',
            subject: 'Mathematics',
            materials: [],
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('subject', 'Mathematics');
        });
    });

    it('should get all exams', () => {
        cy.request('GET', `${baseUrl}/exams`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    it('should get a specific exam by ID', () => {
        const id = Date.now()
        cy.request('POST', `${baseUrl}/post`, {
            id: id,
            date: new Date(),
            difficulty_rating: 3,
            type: 'Midterm',
            subject: 'Mathematics',
            materials: [],
        }).then((response) => {
            const examId = id;
            cy.request('GET', `${baseUrl}/exams/${examId}`).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('id', examId);
            });
        });
    });

    it('should update an exam by ID', () => {
        cy.request('POST', `${baseUrl}/post`, {
            id: Date.now(),
            date: new Date(),
            difficulty_rating: 3,
            type: 'Midterm',
            subject: 'Mathematics',
            materials: [],
        }).then((response) => {
            const examId = response.body.id;
            cy.request('PUT', `${baseUrl}/exams/${examId}`, {
                subject: 'Updated History',
                date: '2024-06-02',
                difficulty_rating: 3,
                type: 'Quiz',
                materials:[]
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('subject', 'Updated History');
            });
        });
    });

    it('should delete an exam by ID', () => {
        cy.request('POST', `${baseUrl}/post`, {
            id: Date.now(),
            date: new Date(),
            difficulty_rating: 3,
            type: 'Midterm',
            subject: 'Mathematics',
            materials: [],
        }).then((response) => {
            const examId = response.body.id;
            cy.request('DELETE', `${baseUrl}/exams/${examId}`).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('message', 'Exam deleted successfully');
            });
        });
    });
});

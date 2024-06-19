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


});
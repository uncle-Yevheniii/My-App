export default function AboutProjectPage() {
    return (
        <section className="form-container">
            <h2 className="title-text">About Project</h2>
            <div className="bg-secondary p-8 rounded-2xl mb-5">
                <p className="text-xl text-background font-normal">
                    This is my pet project, the essence of which is user registration, verification and authorization. <br />
                    <br />
                    The project was written on TS using the following technologies: Axios, React, Redux, Node, Express, Mongoose and JWT.
                    <br />
                    <br />
                    Implemented: [Registration of a new user, Email verification, Uploading a profile photo, Exiting the profile, Logging in using
                    user data and Receiving data via cookies].
                    <br />
                    Data validation is present on the registration and login forms. Validation is present both on the server and on the client
                </p>
            </div>
        </section>
    )
}

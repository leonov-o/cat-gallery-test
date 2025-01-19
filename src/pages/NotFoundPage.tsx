import {Link} from "react-router";

export const NotFoundPage = () => {
    return (
        <div>
            <div className="text-center">
                <img src="notFound.png" alt="notFound" className="mx-auto scale-75"/>
                <h2 className="mb-8 text-4xl font-bold text-gray-600">Page Not Found</h2>
                <p className="mb-8 text-lg text-gray-500">Oops! The page you're looking for doesn't exist.</p>
                <Link
                    to="/"
                    className="rounded-md bg-orange-500 px-6 py-3 text-lg font-semibold text-white transition hover:bg-orange-600"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

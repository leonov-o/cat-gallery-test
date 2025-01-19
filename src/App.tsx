import {HomePage} from "./pages/HomePage.tsx";
import {useQuery} from "react-query";
import {catService} from "./entities/cat/cat.service.ts";
import {useUserStore} from "./store";
import {BrowserRouter, Route, Routes} from "react-router";
import {FavouritesPage} from "./pages/FavouritesPage.tsx";
import {Header} from "./components/Header.tsx";
import {NotFoundPage} from "./pages/NotFoundPage.tsx";
import {toast} from "react-toastify";

function App() {
    const {setBreeds} = useUserStore();

    useQuery({
        queryKey: ['breeds'],
        queryFn: () => catService.getBreeds(),
        refetchOnWindowFocus: false,
        onSuccess: (data) => setBreeds(data),
        onError: () => {
            toast("Something went wrong", {type: "error"})
        }
    })


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="favourites" element={<FavouritesPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

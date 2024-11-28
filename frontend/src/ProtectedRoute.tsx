import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {Context} from "./index";
import {Spinner} from "@nextui-org/react";
interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = observer(({ children }) => {
    const { store } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await store.checkAuth();
                if(store.isAuth) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                alert("Ошибка при загрузке данных:" + error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex gap-4" style={{justifyContent: "center", verticalAlign: "center", width: '100vw', height: '100vh'}}>
                <Spinner size="lg"/>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
});

export default ProtectedRoute;

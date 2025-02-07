import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, clearData } from "../redux/actions";

const DataViewer = () => {
    const [url, setUrl] = useState("https://swapi.py4e.com/api/people/1/");
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.data);

    const handleFetch = () => {
        if (url.trim() === "") {
            alert("Введите URL");
            return;
        }
        dispatch(fetchData(url));
    };

    const handleClear = () => {
        dispatch(clearData());
    };

    return (
        <div
            style={{
                maxWidth: "800px", 
                margin: "0 auto", 
                padding: "20px",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h1>SWAPI Viewer</h1>
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Введите URL"
                    style={{
                        width: "60%",
                        padding: "10px",
                        marginRight: "10px",
                        fontSize: "16px",
                    }}
                />
                <button
                    onClick={handleFetch}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    Get Info
                </button>
            </div>
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "20px",
                    borderRadius: "5px",
                    background: "#f9f9f9",
                    minHeight: "200px",
                }}
            >
                {loading && <p>Загрузка...</p>}
                {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
                {data ? (
                    <pre
                        style={{
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                        }}
                    >
                        {JSON.stringify(data, null, 2)}
                    </pre>
                ) : (
                    <p>Данных пока нет.</p>
                )}
            </div>
            <button
                onClick={handleClear}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    background: "#ff4d4d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                }}
            >
                Очистить данные
            </button>
        </div>
    );
};

export default DataViewer;

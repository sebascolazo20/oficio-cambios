import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '/public/styles/cursos.css';
import categoriasData from '/src/categorias.json';
import cursosData from '/src/cursos.json';

function Cursos() {
    const { categoriaId, cursoId } = useParams(); 
    const [categorias] = useState(categoriasData.Categorias);
    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        if (categoriaId) {
            const categoria = categorias.find((cat) => cat.id === parseInt(categoriaId));
            if (categoria) {
                const cursosFiltrados = cursosData.Cursos.filter((curso) =>
                    Array.isArray(curso.categoriaIds) && curso.categoriaIds.includes(parseInt(categoriaId))
                );
                setCursos(cursosFiltrados);
            }
        } else {
            setCursos([]);
        }
    }, [categoriaId]);

    useEffect(() => {
        if (cursoId) {
            const curso = cursos.find((curso) => curso.id === parseInt(cursoId));
            if (curso) {
                setCursoSeleccionado(curso);
            }
        } else {
            setCursoSeleccionado(null);
        }
    }, [cursoId, cursos]);

    const handleClickCurso = (cursoId) => {
        navigate(`/cursos/${categoriaId}/detalle/${cursoId}`);
    };

    const handleClickCategoria = (categoriaId) => {
        navigate(`/cursos/${categoriaId}`);
    };

    const handleVolverCategorias = () => {
        navigate('/cursos'); 
    };

    const handleVolverCursos = () => {
        navigate(`/cursos/${categoriaId}`);
    };

    return (
        <div id="root">
            <div className="categorias-container">
                {cursoSeleccionado ? (
                    <>
                        <h1 className="categorias-title">{cursoSeleccionado.nombre}</h1>
                        <div className="curso-detalle">
                            <div className="curso-info-left">
                                <img
                                    src={`/public/assets/cursos/categorias/${cursoSeleccionado.imagen}`}
                                    alt={cursoSeleccionado.nombre}
                                    className="curso-imagen"
                                />
                                <div className="sobre-curso">
                                    <h3>Sobre el curso:</h3>
                                    <p>{cursoSeleccionado.descripcion}</p>
                                </div>
                            </div>
                            <div className="curso-info-right">
                                <h2>Detalles del curso</h2>
                                <p><strong>Duración:</strong> {cursoSeleccionado.duracion}</p>
                                <p><strong>Carga horaria total:</strong> {cursoSeleccionado.cargaHoraria}</p>
                                <p><strong>Días y horarios:</strong> {cursoSeleccionado.diasHorarios}</p>
                                <p><strong>Inicio:</strong> {cursoSeleccionado.inicio}</p>
                                <p><strong>Lugar:</strong> {cursoSeleccionado.lugar}</p>

                                <h3>Al finalizar:</h3>
                                <ul>
                                    {cursoSeleccionado.logros.map((logro, index) => (
                                        <li key={index}>{logro}</li>
                                    ))}
                                </ul>

                                <h3>Requisitos:</h3>
                                <ul>
                                    {cursoSeleccionado.requisitos.map((requisito, index) => (
                                        <li key={index}>{requisito}</li>
                                    ))}
                                </ul>
                                
                                {/* Sección del profesor modificada */}
                                {cursoSeleccionado.profesor && (
                                    <div className="profesor-info">
                                        <h3>Profesor:</h3>
                                        <div className="profesor-perfil">
                                            <img 
                                                src={`/public/assets/profesores/${cursoSeleccionado.profesor.foto}`} 
                                                alt={`Profesor ${cursoSeleccionado.profesor.nombre}`} 
                                                className="profesor-imagen"
                                            />
                                            <div className="profesor-datos">
                                                <span className="profesor-nombre">{cursoSeleccionado.profesor.nombre}</span>
                                                {cursoSeleccionado.profesor.profesion && (
                                                    <span className="profesor-profesion">{cursoSeleccionado.profesor.profesion}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Nueva sección de organizaciones */}
                                {cursoSeleccionado.organizaciones && cursoSeleccionado.organizaciones.length > 0 && (
                                    <div className="organizaciones-info">
                                        <h3>Organizaciones:</h3>
                                        <div className="organizaciones-logos">
                                            {cursoSeleccionado.organizaciones.map((logo, index) => (
                                                <img 
                                                    key={index}
                                                    src={`/public/assets/logos/${logo}`}
                                                    alt={`Organización ${index + 1}`}
                                                    className="organizacion-logo"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button className="inscribirse-btn">Inscribirse</button>
                                <button className="volver-btn" onClick={handleVolverCursos}>
                                    Volver a cursos
                                </button>
                            </div>
                        </div>
                    </>
                    
                ) : categoriaId ? (
                    <>
                        <h1 className="categorias-title">
                            {categorias.find((cat) => cat.id === parseInt(categoriaId))?.nombre}
                        </h1>

                        {categoriaId === '1' ? (  
                            <>
                                <div className="calendario-container">
                                    <iframe
                                        src="https://calendar.google.com/calendar/embed?src=d144d619c676186951a99a488d8df1fb0a0b4611a6e5bc5ab61c9e0418610735%40group.calendar.google.com&ctz=America%2FArgentina%2FCordoba"
                                        style={{ border: 0, width: '100%', height: '600px' }}
                                        frameBorder="0"
                                        scrolling="no"
                                    ></iframe>
                                </div>
                                <div className="disponibilidad-mensaje">
                                    <p>Los cursos digitales no están disponibles por el momento. Estamos trabajando para ofrecerte nuevo contenido próximamente.</p>
                                </div>
                            </>
                        ) : (
                            <div className="cursos-container">
                                {cursos.map((curso) => (
                                    <div
                                        className="card-curso"
                                        key={curso.id}
                                        onClick={() => handleClickCurso(curso.id)}
                                    >
                                        <img
                                            src={`/public/assets/cursos/categorias/${curso.imagen}`}
                                            alt={curso.nombre}
                                        />
                                        <div className="contenido">
                                            <div className="nombre">{curso.nombre}</div>
                                            <div className="fecha">
                                                <span>{curso.duracion}</span> - <span>{curso.inicio}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button className="volver-btn" onClick={handleVolverCategorias}>
                            Volver a las categorías
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="categorias-title">Oficios</h1>
                        <div className="categorias-gallery">
                            {categorias.map((categoria) => (
                                <div
                                    className="categoria-card"
                                    key={categoria.id}
                                    onClick={() => handleClickCategoria(categoria.id)}
                                >
                                    <img
                                        src={`/public/assets/cursos/categorias/${categoria.imagen}`}
                                        alt={categoria.nombre}
                                        className="categoria-image"
                                    />
                                    <div className="categoria-overlay">{categoria.nombre}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cursos;
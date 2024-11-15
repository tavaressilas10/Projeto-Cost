import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import styles from './Project.module.css';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState(null);
    const [type, setType] = useState(null);

   
    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data);
                    setServices(data.services || []);
                })
                .catch((err) => console.error("Failed to fetch project data:", err));
        }, 500); 
    }, [id]);


    const toggleProjectForm = () => setShowProjectForm(!showProjectForm);
    const toggleServiceForm = () => setShowServiceForm(!showServiceForm);

  
    const editPost = (updatedProject) => {
        setMessage(null);
        if (updatedProject.budget < updatedProject.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto');
            setType('error');
            return;
        }

        fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProject),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setShowProjectForm(false);
                setMessage('Projeto atualizado com sucesso!');
                setType('success');
            })
            .catch((err) => console.error("Failed to update project:", err));
    };

    
    const createService = (projectData) => {
        setMessage(null);
        const newService = { ...projectData.services[projectData.services.length - 1], id: uuidv4() };
        
        const newCost = parseFloat(projectData.cost) + parseFloat(newService.cost);
        if (newCost > parseFloat(projectData.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço!');
            setType('error');
            return;
        }

  
        const updatedProject = {
            ...projectData,
            services: [...projectData.services, newService],
            cost: newCost
        };
        
        fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProject),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setServices(data.services);
                setMessage('Serviço adicionado com sucesso!');
                setType('success');
            })
            .catch((err) => console.error("Failed to add service:", err));
    };

  
    const removeService = (serviceId, serviceCost) => {
        const updatedServices = services.filter((service) => service.id !== serviceId);
        const updatedProject = {
            ...project,
            services: updatedServices,
            cost: parseFloat(project.cost) - parseFloat(serviceCost),
        };

        fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProject),
        })
            .then((resp) => resp.json())
            .then(() => {
                setProject(updatedProject);
                setServices(updatedServices);
                setMessage('Serviço removido com sucesso!');
                setType('success');
            })
            .catch((err) => console.error("Failed to remove service:", err));
    };

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {showProjectForm ? 'Fechar' : 'Editar Projeto'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category?.name || 'N/A'}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir edição"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {showServiceForm ? 'Fechar' : 'Adicionar Serviço'}
                            </button>
                            {showServiceForm && (
                                <div className={styles.project_info}>
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar Serviço"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>

                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 ? (
                                services.map((service) => (
                                    <ServiceCard
                                        key={service.id}
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        handleRemove={removeService}
                                    />
                                ))
                            ) : (
                                <p>Não há serviços cadastrados</p>
                            )}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Project;

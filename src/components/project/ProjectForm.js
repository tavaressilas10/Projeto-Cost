import { useState, useEffect } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitBnt from '../form/SubmitBnt'
import styles from './ProjectForm.module.css'


function ProjectForm({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {

        fetch('http://localhost:5000/categories', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.error (err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }
    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProject({ ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
    })
}

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name}
            />
            <Input
                type="number"
                text="Orcamento do Projeto"
                name="budget"
                placeholder="Insira o orcamento total"
                handleOnChange={handleChange}
                value={project.budget}
            />


            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id: ''}
            />

            <SubmitBnt
                text={btnText} />
        </form>
    )
}
export default ProjectForm



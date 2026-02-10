import { useForm } from 'react-hook-form';

const Form = ({inputs, onSubmit, submitLabel}) => {
    const {register, handleSubmit, formState: {errors}} = useForm()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                inputs.map((i) => (
                    <div key={i.name}>
                        <label>{i.label}</label>
                        <input type={i.type} {...register(i.name, i.validation)} />
                        {errors [i.name] && (<p style={{color: 'red'}}>{errors[i.name].message}</p>)}
                    </div>
                ))
            }

            <button type="submit">{submitLabel}</button>
        </form>
    )
}

export default Form
import './form-input.styles.scss'

const FormInput = ({ onInputChange, label, ...otherProps }) => (
  <div className='group'>
    <input
      className='form-input'
      onChange={onInputChange}
      {...otherProps}
    />
    {
      label ?
      (<label
          className={
            `${otherProps.value.length ? 'shrink': ''}
            form-input-label`
          }
        >
          {label}
      </label>)
      :
      null
    }
  </div>
)

export default FormInput

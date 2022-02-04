import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel
} from './form-input.styles'

const FormInput = ({ onInputChange, label, ...otherProps }) => (
  <GroupContainer>
    <FormInputContainer
      onChange={onInputChange}
      {...otherProps}
    />
    {
      label ?
      (<FormInputLabel
          className={
            `${otherProps.value.length ? 'shrink': ''}
            form-input-label`
          }
        >
          {label}
      </FormInputLabel>)
      :
      null
    }
  </GroupContainer>
)

export default FormInput

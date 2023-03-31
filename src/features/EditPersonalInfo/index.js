import React from "react"
import { View } from "react-native"
import { Text, StyleService, useStyleSheet } from "@ui-kitten/components"
import {
  DateInput,
} from "../../components/DateInput"
import * as yup from "yup"
import { useForm } from "react-hook-form"

export default ({ route, navigation }) => {
  const styles = useStyleSheet(themedStyles)

  const yupSchema = yup.object().shape({
    date_birth: yup
      .string()
      .label("Birth Date")
      .required(),
  })
  const defaultValues = {
    date_birth: '',
  }
  const resolver = useYupValidationResolver(yupSchema)

  const {
    control,
  } = useForm({ resolver, defaultValues })

  const commonInputProps = {
    control,
    required: true,
  }

  return (
    <View style={styles.container}>
      <Text>Personal Information</Text>
      <DateInput
        name="date_birth"
        label="Date of Birth"
        {...commonInputProps}
      />
    </View>
  )
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const useYupValidationResolver = (validationSchema) =>
  React.useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        })

        return {
          values,
          errors: {}
        }
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message
              }
            }),
            {}
          )
        }
      }
    },
    [validationSchema]
  )
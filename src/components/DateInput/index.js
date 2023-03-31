import React from "react"
import { Datepicker } from "@ui-kitten/components"
import { MomentDateService } from "@ui-kitten/moment"
import moment from "moment"

import { Controller } from "react-hook-form"
import { CalendarIcon } from "../icons"
import config from "../../native-common/config"

const dateService = new MomentDateService("en", {
  format: config.odooDateFormat
})

export function DateInput({
  name,
  control,
  style,
  label,
  errors,
  inputProps,
  onChangeCallBack,
  onBlurCallBack
}) {
  return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          if (value === undefined || value === null || value === "") {
            // value = moment();
          } else {
            value = moment(value, config.odooDateFormat)
          }
          return (
            <Datepicker
              label={label}
              date={value}
              placeholder="Pick Date"
              style={style}
              dateService={dateService}
              // max={new Date(new Date().getFullYear() + 50, 1, 1)}
              min={moment().subtract(100, "years")}
              max={moment().add(50, "years")}
              onSelect={(value) => {
                onChange(value)
                onChangeCallBack && onChangeCallBack(value)
              }}
              onBlur={(e) => {
                onBlur()
                onBlurCallBack && onBlurCallBack()
              }}
              accessoryRight={CalendarIcon}
              size="large"
              {...inputProps}
            />
          )
        }}
      />
  )
}

'use client'
import { E164Number } from "libphonenumber-js/core";
import { Input } from "@/components/ui/input"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Control } from "react-hook-form"
import { FormFieldType } from "../forms/PatientForm"
import React from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { render } from "react-dom";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import { Textarea } from "./textarea";
import { Checkbox } from "./checkbox";

  interface CustomProps {
    control : Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    icoSrc? : React.ReactNode,
    iconAlt?: string,
    type?: string,
    disabled?: boolean,
    dateFormat? : string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    includeTimes?: Date[],
    renderSkeleton?: (field: any) => React.ReactNode,
    filter?: any
  }

  const RenderField =({field, props}: {field: any; props: CustomProps}) =>{

    const {control, fieldType, name,type,  label, placeholder, iconSrc,icoSrc, iconAlt, disabled, dateFormat, showTimeSelect, children, renderSkeleton, filter } = props;
    switch (fieldType) {
      
      case FormFieldType.INPUT:
        return (
          <div className="flex rounded-md border bg-dark-400">
            {iconSrc && (
              <Image
                src={iconSrc}
                height={24}
                width={24}
                alt={iconAlt || "icon"}
                className="ml-2"
              />
            )}
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                onChange={field.onChange}
                className='shad-input border-0'
                type={type}
              />





            </FormControl>
          </div>);
               
      case FormFieldType.PHONE_INPUT:
        return (
          <FormControl>
            <PhoneInput
              defaultCountry="MA"
              placeholder={placeholder}
              international
              withCountryCallingCode
              value={field.value as E164Number | undefined}
              onChange={field.onChange}
              className="input-phone flex rounded-md border-white bg-white-400"
            />
          </FormControl>
        );
      
      case FormFieldType.PASS:
        return (
          <div className="flex rounded-md border bg-dark-400">
            {icoSrc && (
              console.log(icoSrc),
              <span
                className="ml-2 flex items-center justify-center"
                style={{ height: 38, width: 24 }}>{icoSrc}</span> // Render the React element (like a button)
            )}
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                onChange={field.onChange}
                className='shad-input border-0'
                type={type}
              />
            </FormControl>
            
          </div>);
      
      case FormFieldType.DATE_PICKER:
        return (
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
              className="ml-2" />
            <FormControl>

              
              <DatePicker selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat={dateFormat ?? 'MM/dd/yyyy'}
                //controls={['calendar']}
                showTimeSelect={showTimeSelect ?? false}
                timeIntervals={30} // 30-minute increments
                filterDate={filter}
                //includeTimes={includeTimes}
                //includeDates={includeTimes}
                //highlightDates={includeTimes}
                //filterDate= {includeTimes => includeTimes.getDay() !== 6 && includeTimes.getDay() !== 0}
                timeInputLabel="Time:"
                wrapperClassName="date-picker" />
                  

            </FormControl>

          </div>
        );
        
      case FormFieldType.SKELETON:

        return (
          renderSkeleton ? renderSkeleton(field) : null
        );
      
      case FormFieldType.SELECT:

        return (
          <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl> 
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
                {props.children}
            </SelectContent>
          </Select>
        </FormControl>
        );
      
      case FormFieldType.TEXTAREA:
        return (
          <FormControl>
            <Textarea 
              placeholder={placeholder}
              {...field}
              className="shad-textArea"
              disabled={props.disabled}
            />
          </FormControl>
        );
      
      case FormFieldType.CHECKBOX:
        return (
          <FormControl>
            <div className="flex items-center gap-4">
              <Checkbox 
                id={props.name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label htmlFor={props.name} className="checkbox-label">{props.label}</label>

            </div>



          </FormControl>
        );
      
      default:
        break;
      
      

        
    }

  }

const CustomFormField = (props: CustomProps) => {
    const {control, fieldType, name, label} = props;
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex-1">
                {fieldType !== FormFieldType.CHECKBOX && label &&(
                    <FormLabel>{label}</FormLabel>
                )}

                <RenderField field= {field} props={props} />
                <FormMessage className="shad-error"/>
                


            </FormItem>
          )}
        />
  )
}

export default CustomFormField
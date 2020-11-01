import React from 'react';
import _ from 'lodash';
import {
  FormTextField,
  FormSubmit,
  FormArchiveFolderSelect,
  FormRow,
  FormLabel,
  FormSelectField,
} from '../utility/forms';
import { Formik, Form, useFormikContext } from 'formik';

function MacroArgument({ arg, namePrefix }) {
  const name = `${namePrefix}${arg.name}`;
  if (arg.type == 'text') {
    return <FormTextField label={arg.label} name={name} />;
  }
  if (arg.type == 'select') {
    return (
      <FormSelectField label={arg.label} name={name}>
        {arg.options.map((opt) =>
          _.isString(opt) ? <option value={opt}>{opt}</option> : <option value={opt.value}>{opt.name}</option>
        )}
      </FormSelectField>
    );
  }
  return null;
}

function MacroArgumentList({ args, onChangeValues, namePrefix }) {
  const { values } = useFormikContext();
  React.useEffect(() => {
    if (onChangeValues) onChangeValues(values);
  }, [values]);
  return (
    <>
      {' '}
      {args.map((arg) => (
        <MacroArgument arg={arg} key={arg.name} namePrefix={namePrefix} />
      ))}
    </>
  );
}

export default function MacroParameters({ args, onChangeValues, macroValues, namePrefix }) {
  if (!args || args.length == 0) return null;
  const initialValues = {
    ..._.fromPairs(args.filter((x) => x.default != null).map((x) => [`${namePrefix}${x.name}`, x.default])),
    ...macroValues,
  };
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <Form>
        <MacroArgumentList args={args} onChangeValues={onChangeValues} namePrefix={namePrefix} />
      </Form>
    </Formik>
  );
}
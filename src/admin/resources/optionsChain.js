// import React from 'react';
// import {
//     List,
//     Datagrid,
//     TextField,
//     NumberField,
//     DateField,
//     Edit,
//     Create,
//     SimpleForm,
//     TextInput,
//     NumberInput,
//     DateInput,
//     required,
// } from 'react-admin';

// export const OptionsChainList = () => (
//     <List>
//         <Datagrid rowClick="edit">
//             <TextField source="id" />
//             <TextField source="symbol" />
//             <NumberField source="strike_price" />
//             <DateField source="expiry_date" />
//             <NumberField source="call_price" />
//             <NumberField source="put_price" />
//             <TextField source="status" />
//         </Datagrid>
//     </List>
// );

// export const OptionsChainEdit = () => (
//     <Edit>
//         <SimpleForm>
//             <TextInput disabled source="id" />
//             <TextInput source="symbol" validate={required()} />
//             <NumberInput source="strike_price" validate={required()} />
//             <DateInput source="expiry_date" validate={required()} />
//             <NumberInput source="call_price" validate={required()} />
//             <NumberInput source="put_price" validate={required()} />
//             <TextInput source="status" />
//         </SimpleForm>
//     </Edit>
// );

// export const OptionsChainCreate = () => (
//     <Create>
//         <SimpleForm>
//             <TextInput source="symbol" validate={required()} />
//             <NumberInput source="strike_price" validate={required()} />
//             <DateInput source="expiry_date" validate={required()} />
//             <NumberInput source="call_price" validate={required()} />
//             <NumberInput source="put_price" validate={required()} />
//             <TextInput source="status" />
//         </SimpleForm>
//     </Create>
// );
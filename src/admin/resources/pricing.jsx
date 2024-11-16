// import React from 'react';
// import {
//     List,
//     Datagrid,
//     TextField,
//     NumberField,
//     Edit,
//     Create,
//     SimpleForm,
//     TextInput,
//     NumberInput,
//     required,
// } from 'react-admin';

// export const PricingList = () => (
//     <List>
//         <Datagrid rowClick="edit">
//             <TextField source="id" />
//             <TextField source="plan_name" />
//             <NumberField
//                 source="price"
//                 options={{ style: 'currency', currency: 'USD' }}
//             />
//             <TextField source="duration" />
//             <NumberField source="api_calls_limit" />
//             <TextField source="features" />
//         </Datagrid>
//     </List>
// );

// export const PricingEdit = () => (
//     <Edit>
//         <SimpleForm>
//             <TextInput disabled source="id" />
//             <TextInput source="plan_name" validate={required()} />
//             <NumberInput source="price" validate={required()} />
//             <TextInput source="duration" validate={required()} />
//             <NumberInput source="api_calls_limit" validate={required()} />
//             <TextInput
//                 multiline
//                 rows={4}
//                 source="features"
//                 validate={required()}
//             />
//         </SimpleForm>
//     </Edit>
// );

// export const PricingCreate = () => (
//     <Create>
//         <SimpleForm>
//             <TextInput source="plan_name" validate={required()} />
//             <NumberInput source="price" validate={required()} />
//             <TextInput source="duration" validate={required()} />
//             <NumberInput source="api_calls_limit" validate={required()} />
//             <TextInput
//                 multiline
//                 rows={4}
//                 source="features"
//                 validate={required()}
//             />
//         </SimpleForm>
//     </Create>
// );

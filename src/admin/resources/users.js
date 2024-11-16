// import React from 'react';
// import {
//     List,
//     Datagrid,
//     TextField,
//     EmailField,
//     DateField,
//     Edit,
//     Create,
//     SimpleForm,
//     TextInput,
//     SelectInput,
//     required,
//     email,
// } from 'react-admin';

// export const UserList = () => (
//     <List>
//         <Datagrid rowClick="edit">
//             <TextField source="id" />
//             <EmailField source="email" />
//             <TextField source="role" />
//             <DateField source="created_at" />
//             <DateField source="last_login" />
//         </Datagrid>
//     </List>
// );

// export const UserEdit = () => (
//     <Edit>
//         <SimpleForm>
//             <TextInput disabled source="id" />
//             <TextInput source="email" validate={[required(), email()]} />
//             <SelectInput 
//                 source="role" 
//                 choices={[
//                     { id: 'USER', name: 'User' },
//                     { id: 'ROLE_ADMIN', name: 'Admin' },
//                 ]}
//                 validate={required()}
//             />
//         </SimpleForm>
//     </Edit>
// );

// export const UserCreate = () => (
//     <Create>
//         <SimpleForm>
//             <TextInput source="email" validate={[required(), email()]} />
//             <TextInput source="password" type="password" validate={required()} />
//             <SelectInput 
//                 source="role" 
//                 choices={[
//                     { id: 'USER', name: 'User' },
//                     { id: 'ROLE_ADMIN', name: 'Admin' },
//                 ]}
//                 validate={required()}
//             />
//         </SimpleForm>
//     </Create>
// );
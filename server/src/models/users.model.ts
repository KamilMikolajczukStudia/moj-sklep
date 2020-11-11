import { User } from '../interfaces/users.interface'

// password: q1w2e3r4
const userModel: User[] = [
  {
    id: 1,
    login: 'ala',
    password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56'
  },
  {
    id: 2,
    login: 'maciek',
    password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56'
  },
  {
    id: 3,
    login: 'patryk',
    password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56'
  },
  {
    id: 4,
    login: 'wojciech',
    password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56'
  }
]

export default userModel

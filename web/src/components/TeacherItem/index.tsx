import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface Teacher {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemOpts {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemOpts> = ({
  teacher: {
    avatar,
    bio,
    cost,
    id,
    name,
    subject,
    whatsapp,
  }
}) => {
  const createNewConnection = () => {
    api.post('connections', { user_id: id })
  }

  return (
    <article className='teacher-item'>
      <header>
        <img src={avatar} alt={name} />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>{bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>{cost}€</strong>
        </p>

        <a
          target='_blank'
          rel='noopener noreferrer'
          onClick={createNewConnection}
          href={`https://wa.me/${whatsapp}`}
        >
          <img src={whatsappIcon} alt='Whatsapp' />
          Entrar em contacto
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;

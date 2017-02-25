import { schema } from 'normalizr';

export const notification = new schema.Entity('notifications');

export const event = new schema.Entity('events', {}, {
  idAttribute: '_id',
});


export const brand = new schema.Entity('brands', {}, {
  idAttribute: '_id',
});

export const benefit = new schema.Entity('benefits', {
  responsable: {
    brand,
  },
}, {
  idAttribute: '_id',
});

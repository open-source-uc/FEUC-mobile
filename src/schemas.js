import { schema } from 'normalizr';

export const notification = new schema.Entity('notifications');

export const brand = new schema.Entity('brands', {}, {
  idAttribute: '_id',
});

export const tag = new schema.Entity('tags', {}, {
  idAttribute: '_id',
});

export const campus = new schema.Entity('campuses', {}, {
  idAttribute: '_id',
});

export const initiative = new schema.Entity('initiatives', {}, {
  idAttribute: '_id',
});

export const delegationship = new schema.Entity('delegationships', {}, {
  idAttribute: '_id',
});

export const benefit = new schema.Entity('benefits', {
  responsable: {
    brand,
  },
}, {
  idAttribute: '_id',
});

export const event = new schema.Entity('events', {
  campus,
  tags: [tag],
  organizer: {
    initiative,
    delegationship,
  },
}, {
  idAttribute: '_id',
});

import { hash, compare, genSalt } from "bcrypt";
import { Op } from "sequelize";
import { v1 as uuidv1 } from "uuid";

/**
 * generateSalt
 *
 * @param factor number
 */
export const generateSalt = (factor: number): Promise<string> => {
  return genSalt(factor);
};

/**
 * toHash
 *
 * @param {*} pass
 *
 * password hashing
 */
export const toHash = async (pass: string): Promise<string> => {
  return hash(pass, 10);
};

/**
 * checkHash
 *
 * @param {*} plain
 * @param {*} encrypted
 *
 * compare password hash with plain text
 */
export const checkHash = (
  plain: string,
  encrypted: string
): Promise<boolean> => {
  return compare(plain, encrypted);
};

export const uuid = () => {
  return uuidv1();
};

export const nameFromSlug = (slug: string) => {
  return slug.indexOf("-") !== -1
    ? slug
        .split("-")
        .map((s: string) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`)
        .join(" ")
    : `${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
};

export const mapByField = (data: any[], field: string) => {
  return data.map((entry: any) => entry[field]);
};

export const paginate = (query, { page, pageSize }) => {
  const offset = (page-1) * pageSize;
  const limit = pageSize;
  return {
    ...query,
    offset,
    limit,
  };
};


export const getFilterParams = (body: any, limit = 30) => {
  const page = body.page || 1;
  limit = parseInt(body.limit || limit);
  const offset = (page - 1) * limit;
  const order = body.sort || [["id", "DESC"]];
  const where = { deleted: 0 };
  const date_filters = [];
  if (body.start_date && body.date_field) {
    date_filters.push({ [Op.gte]: new Date(body.start_date) });
  }
  if (body.end_date && body.date_field) {
    date_filters.push({ [Op.lte]: new Date(body.end_date) });
  }
  if (date_filters.length > 0) {
    where[body.date_field] = {
      [Op.and]: date_filters,
    };
  }
  if (body.search && body.search_fields) {
    const orFilter = [];
    for (let i = 0; i < body.search_fields.length; i++) {
      orFilter.push({
        [body.search_fields[i]]: { [Op.like]: "%" + body.search + "%" },
      });
    }
    where[Op.or] = orFilter;
  }
  return {
    order,
    limit,
    offset,
    where,
    raw: true,
    nest: true,
  };
}
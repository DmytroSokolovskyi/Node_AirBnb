const User = require('../dataBase/User');

module.exports = {
    getAllusers: (query = {}) => {
        const {
            perPage = 20,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const findObject = {};
        const ageFilter = {};

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'name':
                    findObject.name = { $regex: `^${filters.name}`, $options: 'i' } ;
                    break;
                case 'email':
                    findObject.email = { $regex: `^${filters.email}`, $options: 'i' } ;
                    break;
                case 'role':
                    const rolesArr = filters.role.split(';');

                    findObject.role = { $in: rolesArr } ;
                    break;
                case 'ageGte':
                    Object.assign(ageFilter, { $gte: +filters.ageGte });
                    break;
                case 'ageLte':
                    Object.assign(ageFilter, { $lte: +filters.ageLte });
                    break;
            }
        });

        if (Object.values(ageFilter).length) {
            findObject.age = ageFilter;
        }

        const orderBy = order === 'asc' ? -1 : 1;

        return User
            .find(findObject)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page - 1) * perPage);
    }
};

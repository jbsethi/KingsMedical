module.exports = async function( pageNo, pageSize, model, include = {}){

    let page = (pageNo) ? Math.abs(pageNo) : 1;
    let size = (pageSize) ? Math.abs(pageSize) : 10;
    
    if(size > 100){
        size = 100;
    }

    let offset = (page - 1) * size;

    // console.log(`Page:${page}, Size:${size}, Offset: ${offset}`);

    // For including associations or any other  SEQUELIZE condition
    let conditions = {
        limit: size,
        offset: offset,
        attributes: { exclude: ['password', 'createdBy', 'updatedBy', 'updatedAt', 'live'] },
        where: { live: true },
        order: [
            ['id', 'DESC']
        ],
    }

    Object.assign(conditions, include);
    
    let records = await model.findAndCountAll(conditions);

    let totalPages = Math.ceil(records.count / size);
    totalPages = (totalPages > 0) ? totalPages : 1;
    
    records.pageNo = page;
    records.pageSize = size;
    records.totalPages = totalPages;

    return records;

}
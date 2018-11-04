export const queries = {
    insertAccessor: `INSERT INTO AccessorDetails
                        (name, userRoleId, password, contact, isActive) values 
                        (:name, :userRoleId, :password, :contact, :isActive)`,
    searchParticularUser: `SELECT * from AccessorDetails WHERE name = :payLoadName`
}

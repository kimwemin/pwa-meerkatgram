/**
 * @file databases/seeders/dummy-users.seeder.js
 * @description users table dummy data create
 * 251118 v1.0.0 김위민 init
 */
import bcrypt from 'bcrypt';

// 테이블명
const tableName = 'users';


/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        email: 'admin@admin.com',
        // bcrypt: 단방향 암호화 문법(복호화 안 됨)
        // hash : 비동기 처리 await 처리 필수
        // hashSync 시 await 처리 없어도 동작
        password: await bcrypt.hash('qwe12312', 10),
        nick: '미어캣관리자',
        provider: 'NONE',
        role: 'SUPER',
        profile: '',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'admin2@admin.com',
        password: await bcrypt.hash('qwe12312', 10), // bcrypt: 단방향 암호화 문법(복호화 안 됨)
        nick: '미어캣관리자2',
        provider: 'KAKAO',
        role: 'NOMAL',
        profile: '',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ];

    // 데이터 생성 : queryInterface.bulkInsert(tableName, records, options);
    // options 자리는 필요없을 시 빈 객체 혹은 생략 가능
    await queryInterface.bulkInsert(tableName, records, {});
  },

  async down (queryInterface, Sequelize) {
    // 데이터 삭제 : queryInterface.bulkDelete(tableName, records, options);
    await queryInterface.bulkDelete(tableName, null, {});
  }
};

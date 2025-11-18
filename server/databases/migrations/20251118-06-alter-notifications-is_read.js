/**
 * @file databases/migrations/20251118-06-alter-notifications-is_read.js
 * @description notifications-is_read change
 * 251118 v1.0.0 김위민 init
 */

import { DataTypes } from 'sequelize';

// 테이블명
const tableName = 'notifications';

// 키명
const key = 'is_read';

// 컬럼 정의
// alter란 덮어쓰는 형태이기에 원래 있는 속성 그대로 쓴다고 해도 재정의 해줘야 한다
const upAttributes = {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
  comment: '읽음 여부'
};
// 롤백 시 사용할 이전 속성
const downAttributes = {
  type: DataTypes.TINYINT(1),
  allowNull: false,
  defaultValue: 0,
  comment: '읽음 여부'
}

/** @type {import('sequelize-cli').Migration} */
export default {
  // up과 down은 서로 한쌍으로 움직이며 반대되는 작업을 한다
  // 마이그레이션 실행 시 호출되는 메소드 (스키마 생성, 수정)
  async up (queryInterface, Sequelize) {
    // 컬럼 수정 : queryInterface.changeColumn(tableName, key, attributes, options)
    await queryInterface.changeColumn(tableName, key, upAttributes);
  },

  // 마이그레이션을 롤백 시 호출되는 메소드 (스키마 제거, 수정)
  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(tableName, key, downAttributes);
  }
};

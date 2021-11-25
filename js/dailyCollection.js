//=========================================================================================================
// Hardcoding the entire collection for class schedules.
// ========================================================================================================
db.collection('CRN30388')
    .doc('Monday')
    .update({
        courseID: 'COMP 1510',
        courseName: 'Programming Methods',
        courseRoom: 'SE12 321',
        courseStartTime: new Date(
            'Mon Nov 15 2021 08:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Mon Nov 15 2021 10:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lab',
        courseLink: null,
        courseDelivery: 'In-Person',
        courseInstructor: 'Ife Agboola',
        instructorEmail: 'ife_agboola@bcit.ca',
    });

db.collection('CRN30388')
    .doc('Wednesday')
    .update({
        courseID: 'COMP 1510',
        courseName: 'Programming Methods',
        courseRoom: 'SE12 320',
        courseStartTime: new Date(
            'Wed Nov 17 2021 12:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Wed Nov 17 2021 13:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lab',
        courseLink: null,
        courseDelivery: 'In-Person',
        courseInstructor: 'Ife Agboola',
        instructorEmail: 'ife_agboola@bcit.ca',
    });

db.collection('CRN30384')
    .doc('Monday')
    .update({
        courseID: 'COMP 1510',
        courseName: 'Programming Methods',
        courseRoom: 'SW05 1840',
        courseStartTime: new Date(
            'Mon Nov 15 2021 10:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Mon Nov 15 2021 11:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lecture',
        courseLink:
            'https://bcit.zoom.us/j/97990532046?pwd=LzlpOGhJbnNEcCt6NW9la2hiVXlydz09',
        courseDelivery: 'Online',
        courseInstructor: 'Bruce D. Link',
        instructorEmail: 'Bruce_Link@bcit.ca',
    });

db.collection('CRN30384')
    .doc('Tuesday')
    .update({
        courseID: 'COMP 1510',
        courseName: 'Programming Methods',
        courseRoom: 'SW05 1850',
        courseStartTime: new Date(
            'Tue Nov 16 2021 15:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Tue Nov 16 2021 16:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lecture',
        courseLink:
            'https://bcit.zoom.us/j/97990532046?pwd=LzlpOGhJbnNEcCt6NW9la2hiVXlydz09',
        courseDelivery: 'Online',
        courseInstructor: 'Bruce D. Link',
        instructorEmail: 'Bruce_Link@bcit.ca',
    });

db.collection('CRN30384')
    .doc('Wednesday')
    .update({
        courseID: 'COMP 1510',
        courseName: 'Programming Methods',
        courseRoom: 'SW05 1850',
        courseStartTime: new Date(
            'Wed Nov 17 2021 13:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Wed Nov 17 2021 14:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lecture',
        courseLink:
            'https://bcit.zoom.us/j/97990532046?pwd=LzlpOGhJbnNEcCt6NW9la2hiVXlydz09',
        courseDelivery: 'Online',
        courseInstructor: 'Bruce D. Link',
        instructorEmail: 'Bruce_Link@bcit.ca',
    });

db.collection('CRN31002')
    .doc('Monday')
    .update({
        courseID: 'COMP 1100',
        courseName: 'CST Program Fundamentals',
        courseRoom: 'SW05 1840',
        courseStartTime: new Date(
            'Mon Nov 15 2021 11:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Mon Nov 15 2021 12:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lecture',
        courseLink:
            'https://bcit.zoom.us/j/63854394574?pwd=OXVaT3VFbUNtWHBXcGVWZUpTcDZvdz09',
        courseDelivery: 'Online',
        courseInstructor: 'Donna E. Turner',
        instructorEmail: 'donna_turner@bcit.ca',
    });

db.collection('CRN46873')
    .doc('Tuesday')
    .update({
        courseID: 'COMP 1800',
        courseName: 'Projects 1',
        courseRoom: 'SW03 1710',
        courseStartTime: new Date(
            'Tue Nov 16 2021 10:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Tue Nov 16 2021 12:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lecture',
        courseLink:
            'https://bcit.zoom.us/j/69582366846?pwd=Vk8xNWpNSFc3V1FDNk82d3IwOEdxdz09',
        courseDelivery: 'Online',
        courseInstructor: 'Carly Y. Orr',
        instructorEmail: 'Carly_Wong_Orr@bcit.ca',
    });

db.collection('CRN46860')
    .doc('Tuesday')
    .update({
        courseID: 'COMP 1537',
        courseName: 'Web Development 1',
        courseRoom: 'SW05 1850',
        courseStartTime: new Date(
            'Tue Nov 16 2021 13:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Tue Nov 16 2021 15:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lecture',
        courseLink:
            'https://bcit.zoom.us/j/66246033447?pwd=eFFhOG1ISHJKZHpsOTcrQ1hCUDExZz09',
        courseDelivery: 'Online',
        courseInstructor: 'Arron Ferguson',
        instructorEmail: 'Arron_Ferguson@bcit.ca',
    });

db.collection('CRN48401')
    .doc('Wednesday')
    .update({
        courseID: 'COMP 1510',
        courseName: 'Programming Methods',
        courseRoom: 'SE12 321',
        courseStartTime: new Date(
            'Wed Nov 17 2021 08:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Wed Nov 17 2021 09:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Tutorial',
        courseLink: null,
        courseDelivery: 'In-Person',
        courseInstructor: 'Ife Agboola',
        instructorEmail: 'ife_agboola@bcit.ca',
    });

db.collection('CRN32203')
    .doc('Wednesday')
    .update({
        courseID: 'COMP 1113',
        courseName: 'Applied Mathematics',
        courseRoom: 'SW05 2875',
        courseStartTime: new Date(
            'Wed Nov 17 2021 10:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Wed Nov 17 2021 12:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lab',
        courseLink: null,
        courseDelivery: 'In-Person',
        courseInstructor: 'Paul Rozman',
        instructorEmail: 'Paul_Rozman@bcit.ca',
    });
db.collection('CRN46878')
    .doc('Thursday')
    .update({
        courseID: 'COMP 1800',
        courseName: 'Projects 1',
        courseRoom: 'SE12 322',
        courseStartTime: new Date(
            'Thu Nov 18 2021 08:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Thu Nov 18 2021 10:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lab',
        courseLink:
            'https://bcit.zoom.us/j/66573536191?pwd=Y2E5bitvU3gxdmlJNTlTWGE3Kzh2dz09',
        courseDelivery: 'Online',
        courseInstructor: 'Carly Y. Orr',
        instructorEmail: 'Carly_Wong_Orr@bcit.ca',
    });

db.collection('CRN34590')
    .doc('Thursday')
    .update({
        courseID: 'COMM 1116',
        courseName: 'Business Communications 1',
        courseRoom: 'SE12 313',
        courseStartTime: new Date(
            'Thu Nov 18 2021 10:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Thu Nov 18 2021 12:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lab',
        courseLink: null,
        courseDelivery: 'In-Person',
        courseInstructor: 'Thorsten Ewald',
        instructorEmail: 'Thorsten_Ewald@bcit.ca',
    });

db.collection('CRN46864')
    .doc('Thursday')
    .update({
        courseID: 'COMP 1537',
        courseName: 'Web Development 1',
        courseRoom: 'SE12 322',
        courseStartTime: new Date(
            'Thu Nov 18 2021 13:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Thu Nov 18 2021 15:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lab',
        courseLink:
            'https://bcit.zoom.us/j/68055852135?pwd=Zno2cXVJWVBRTTArUStqdlFTK3BEUT09',
        courseDelivery: 'Online',
        courseInstructor: 'Arron Ferguson',
        instructorEmail: 'Arron_Ferguson@bcit.ca',
    });

db.collection('CRN45304')
    .doc('Thursday')
    .update({
        courseID: 'COMP 1712',
        courseName: 'Biz Analysis and System Design',
        courseRoom: 'SE12 322',
        courseStartTime: new Date(
            'Thu Nov 18 2021 15:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Thu Nov 18 2021 17:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lab',
        courseLink: null,
        courseDelivery: 'In-Person',
        courseInstructor: 'Ife Agboola',
        instructorEmail: 'ife_agboola@bcit.ca',
    });

db.collection('CRN34327')
    .doc('Friday')
    .update({
        courseID: 'COMM 1116',
        courseName: 'Business Communications 1',
        courseRoom: 'SW05 1840',
        courseStartTime: new Date(
            'Fri Nov 19 2021 08:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Fri Nov 19 2021 10:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lecture',
        courseLink:
            'https://bcit.zoom.us/j/63689251214?pwd=UDlNV0cwcHZtS0xKQmxQY2ZuMEdTUT09',
        courseDelivery: 'Online/Async',
        courseInstructor: 'Thorsten Ewald',
        instructorEmail: 'Thorsten_Ewald@bcit.ca',
    });

db.collection('CRN45299')
    .doc('Friday')
    .update({
        courseID: 'COMP 1712',
        courseName: 'Biz Analysis and System Design',
        courseRoom: 'NE01 331',
        courseStartTime: new Date(
            'Fri Nov 19 2021 10:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Fri Nov 19 2021 12:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lecture',
        courseLink: null,
        courseDelivery: 'Online/Bongo',
        courseInstructor: 'Maryam Khezrzadeh',
        instructorEmail: 'mKhezrzadeh@bcit.ca',
    });
db.collection('CRN32200')
    .doc('Friday')
    .update({
        courseID: 'COMP 1113',
        courseName: 'Applied Mathematics',
        courseRoom: 'SW01 1205',
        courseStartTime: new Date(
            'Fri Nov 19 2021 14:30:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseEndTime: new Date(
            'Fri Nov 19 2021 16:20:00 GMT-0800 (Pacific Standard Time)'
        ),
        courseType: 'Lecture',
        courseLink: null,
        courseDelivery: 'Online/Async',
        courseInstructor: 'Paul Rozman',
        instructorEmail: 'Paul_Rozman@bcit.ca',
    });

db.collection('dayCRN')
    .doc('Monday')
    .update({
        classList: ['CRN30388', 'CRN30384', 'CRN31002'],
    });

db.collection('dayCRN')
    .doc('Tuesday')
    .update({
        classList: ['CRN30384', 'CRN46873', 'CRN46860'],
    });
db.collection('dayCRN')
    .doc('Wednesday')
    .update({
        classList: ['CRN30388', 'CRN30384', 'CRN48401', 'CRN32203'],
    });
db.collection('dayCRN')
    .doc('Thrusday')
    .update({
        classList: ['CRN46878', 'CRN34590', 'CRN46864', 'CRN45304'],
    });
db.collection('dayCRN')
    .doc('Friday')
    .update({
        classList: ['CRN34327', 'CRN45299', 'CRN32200'],
    });

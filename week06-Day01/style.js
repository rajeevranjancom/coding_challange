function isValid(phone) {
    var phone = phone.toString();
    if (phone.length == 10) {
        if (phone[0] == 9 || phone[0] == 8 || phone[0] == 7) {
            if (parseInt(phone[4]) + parseInt(phone[5]) + parseInt(phone[6]) <= 25) {
                return true;
            }
        }
    }

    return false;
}

console.log(isValid(9708896142));
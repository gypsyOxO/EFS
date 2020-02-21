

export function getMaxAmendment(amendments) {
    let obj = []

    const res = Math.max(...amendments.map(o => o.AMEND_NUM), 0)
    obj = [
        amendments.find(function(o) {
            return o.AMEND_NUM === res
        })
    ]

    return obj
}

